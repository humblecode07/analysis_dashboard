import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

export const Dataset = () => {
    const [csvData, setCsvData] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const rowsPerPage = 10;

    const parseCSV = (csv) => {
        const lines = csv.trim().split('\n');
        const headers = lines[0].split(',');
        return lines.slice(1).map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index];
                return obj;
            }, {});
        });
    };

    useEffect(() => {
        fetch('/HR_Analytics.csv')
            .then(response => response.text())
            .then(text => setCsvData(text))
            .catch(error => console.error('Error loading CSV:', error));
    }, []);

    const data = useMemo(() => {
        if (!csvData) return [];
        return parseCSV(csvData);
    }, [csvData]);

    // Get unique departments
    const departments = useMemo(() => {
        const depts = [...new Set(data.map(row => row.Department))];
        return ['All', ...depts];
    }, [data]);

    // Get all columns from the first row
    const displayColumns = useMemo(() => {
        return data.length > 0 ? Object.keys(data[0]) : [];
    }, [data]);

    // Filter and sort data
    const filteredAndSortedData = useMemo(() => {
        let filtered = data.filter(row => {
            const matchesSearch = Object.values(row).some(val =>
                val.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
            const matchesDept = selectedDepartment === 'All' || row.Department === selectedDepartment;
            return matchesSearch && matchesDept;
        });

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];
                const aNum = parseFloat(aVal);
                const bNum = parseFloat(bVal);

                if (!isNaN(aNum) && !isNaN(bNum)) {
                    return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
                }
                return sortConfig.direction === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            });
        }

        return filtered;
    }, [data, searchTerm, sortConfig, selectedDepartment]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedData.length / rowsPerPage);
    const paginatedData = filteredAndSortedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleSort = (key) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        });
    };

    return (
        <div className="h-full bg-[#1F1F1F] rounded-tl-[12px] rounded-bl-[12px] text-white">
            <div className='pl-[2.625rem] pt-[3.1875rem] pr-[8.875rem] pb-[5rem] flex flex-col gap-[5.25rem]'>
                <div className='flex gap-[2rem]'>
                    <div className='flex gap-[0.9375rem]'>
                        <div className='w-[6px] h-[11rem] bg-[#FF5733]'></div>
                        <div className='w-[6px] h-[11rem] bg-[#FF5733]'></div>
                        <div className='w-[6px] h-[11rem] bg-[#FF5733]'></div>
                    </div>
                    <div className='font-rubik-one flex flex-col'>
                        <p className='text-[3rem]'>HR</p>
                        <p className='text-[5.625rem]'>DATASET</p>
                    </div>
                </div>
                <div className='flex flex-col gap-[1.3125rem]'>
                    <p className='text-[1.5rem] font-bold'>Dataset Overview</p>
                    <p>
                        This dataset contains comprehensive employee information including demographics, job details, satisfaction metrics, and attrition data.
                    </p>
                </div>
                <div className='flex flex-col gap-[2rem]'>
                    <div className='flex flex-col gap-[1.3125rem]'>
                        <p className='text-[1.5rem] font-bold'>Filters & Search</p>

                        <div className='flex gap-4 flex-wrap'>
                            <div className='relative flex-1 min-w-[300px]'>
                                <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                                <input
                                    type="text"
                                    placeholder="Search across all fields..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className='w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF5733]'
                                />
                            </div>
                            <select
                                value={selectedDepartment}
                                onChange={(e) => {
                                    setSelectedDepartment(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className='bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF5733] min-w-[200px]'
                            >
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                            <div className='bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-gray-300 flex items-center min-w-[150px] justify-center'>
                                <span className='font-bold text-[#FF5733]'>{filteredAndSortedData.length}</span>
                                <span className='ml-2'>employees</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-[65dvw] flex flex-col gap-[1.3125rem]'>
                        <p className='text-[1.5rem] font-bold'>Employee Data Table</p>
                        <div className='w-full bg-white rounded-lg shadow-lg p-6 flex flex-col' style={{ maxHeight: '700px' }}>
                            <div className='overflow-auto flex-1'>
                                <table className='w-full'>
                                    <thead className='bg-[#2A2A2A] text-white sticky top-0 z-10'>
                                        <tr className='border-b-2 border-[#FF5733]'>
                                            {displayColumns.map(col => (
                                                <th
                                                    key={col}
                                                    onClick={() => handleSort(col)}
                                                    className='text-left py-3 px-4 cursor-pointer hover:bg-[#3A3A3A] transition-colors whitespace-nowrap text-sm font-bold'
                                                >
                                                    <div className='flex items-center gap-2'>
                                                        {col}
                                                        {sortConfig.key === col && (
                                                            sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                                        )}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.map((row, idx) => (
                                            <tr key={idx} className='border-b border-gray-200 hover:bg-gray-50 transition-colors'>
                                                {displayColumns.map(col => (
                                                    <td key={col} className='py-3 px-4 text-sm whitespace-nowrap text-black'>
                                                        {col === 'MonthlyIncome' || col === 'DailyRate' || col === 'MonthlyRate' ? `${row[col]}` :
                                                            col === 'Attrition' ? (
                                                                <span className={`px-2 py-1 rounded text-xs font-bold ${row[col] === 'Yes' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                                                                    }`}>
                                                                    {row[col]}
                                                                </span>
                                                            ) : col === 'OverTime' ? (
                                                                <span className={`px-2 py-1 rounded text-xs font-bold ${row[col] === 'Yes' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
                                                                    }`}>
                                                                    {row[col]}
                                                                </span>
                                                            ) : row[col]}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='flex justify-between items-center mt-4 pt-4 border-t-2 border-gray-200 flex-shrink-0'>
                                <div className='text-gray-600 font-medium'>
                                    Page {currentPage} of {totalPages}
                                </div>
                                <div className='flex gap-3'>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className='px-6 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors font-medium'
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className='px-6 py-2 bg-[#FF5733] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF6844] transition-colors font-medium'
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dataset;