import React from 'react'

export const DataPreprocessing = () => {
    return (
        <div className="h-full bg-[#1F1F1F] rounded-tl-[12px] rounded-bl-[12px] text-white">
            <div className='pl-[2.625rem] pt-[3.1875rem] pr-[8.875rem] pb-[5rem] flex flex-col gap-[5.25rem]'>
                {/* Header Section */}
                <div className='flex gap-[2rem]'>
                    <div className='flex gap-[0.9375rem]'>
                        <div className='w-[6px] h-[11rem] bg-[#0000FF]'></div>
                        <div className='w-[6px] h-[11rem] bg-[#0000FF]'></div>
                        <div className='w-[6px] h-[11rem] bg-[#0000FF]'></div>
                    </div>
                    <div className='font-rubik-one flex flex-col'>
                        <p className='text-[3rem]'>DATA</p>
                        <p className='text-[5.625rem]'>PREPROCESSING</p>
                    </div>
                </div>

                {/* Introduction */}
                <div className='flex flex-col gap-[1.3125rem]'>
                    <p className='text-[1.5rem] font-bold'>Overview</p>
                    <p>
                        Before any analysis, we had to prepare the data carefully. This is called data preprocessing, and it's critical for valid results. Think of preprocessing like preparing ingredients before cooking—you clean, chop, and organize everything so the actual cooking process goes smoothly.
                    </p>
                </div>

                {/* Data Cleaning Section */}
                <div className='flex flex-col gap-[1.3125rem]'>
                    <p className='text-[1.5rem] font-bold'>Data Cleaning</p>
                    <p>
                        We identified and handled missing values and removed duplicate records. This ensures we're working with clean, reliable data.
                    </p>
                    <div className='bg-[#2A2A2A] p-6 rounded-lg border-2 border-[#0000FF] mt-[1.5rem]'>
                        <div className='flex gap-[3rem] items-center justify-center'>
                            <div className='text-center'>
                                <div className='w-[10rem] h-[10rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                                    <div>
                                        <p className='text-3xl'>✓</p>
                                        <p className='text-sm mt-2'>Missing Values<br />Handled</p>
                                    </div>
                                </div>
                            </div>
                            <div className='text-[#0000FF] text-4xl'>+</div>
                            <div className='text-center'>
                                <div className='w-[10rem] h-[10rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                                    <div>
                                        <p className='text-3xl'>✓</p>
                                        <p className='text-sm mt-2'>Duplicates<br />Removed</p>
                                    </div>
                                </div>
                            </div>
                            <div className='text-[#0000FF] text-4xl'>=</div>
                            <div className='text-center'>
                                <div className='w-[10rem] h-[10rem] flex items-center justify-center bg-[#0000FF] rounded-full text-white font-bold text-center'>
                                    <div>
                                        <p className='text-sm'>Clean,<br />Reliable<br />Data</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Variable Selection Section */}
                <div className='flex flex-col gap-[1.3125rem]'>
                    <p className='text-[1.5rem] font-bold'>Variable Selection</p>
                    <p>
                        We selected 6 core variables from our dataset and engineered 11 additional features through mathematical transformations. This gave us 17 total features for our models.
                    </p>
                    <div className='flex gap-[2rem] items-center justify-center pt-[1.5rem]'>
                        <div className='bg-[#2A2A2A] p-6 rounded-lg border-l-4 border-[#0000FF] flex-1'>
                            <p className='font-bold text-[#0000FF] text-xl mb-3 text-center'>6</p>
                            <p className='text-center text-sm'>Core Variables<br />Selected</p>
                        </div>
                        <div className='text-[#0000FF] text-3xl'>+</div>
                        <div className='bg-[#2A2A2A] p-6 rounded-lg border-l-4 border-[#0000FF] flex-1'>
                            <p className='font-bold text-[#0000FF] text-xl mb-3 text-center'>11</p>
                            <p className='text-center text-sm'>Engineered Features<br />(Transformations)</p>
                        </div>
                        <div className='text-[#0000FF] text-3xl'>=</div>
                        <div className='bg-[#0000FF] p-6 rounded-lg flex-1'>
                            <p className='font-bold text-white text-xl mb-3 text-center'>17</p>
                            <p className='text-center text-sm text-white'>Total Features<br />for Models</p>
                        </div>
                    </div>
                </div>

                {/* Feature Engineering Section */}
                <div className='flex flex-col gap-[1.3125rem]'>
                    <p className='text-[1.5rem] font-bold'>Feature Engineering</p>
                    <p>
                        We created interaction terms—combinations of existing variables that capture complex relationships.
                    </p>
                    <div className='grid grid-cols-2 gap-[2rem] pt-[1.5rem]'>
                        <div className='bg-[#2A2A2A] p-6 rounded-lg border-2 border-[#0000FF]'>
                            <p className='font-bold text-[#0000FF] mb-3'>Satisfaction_Product</p>
                            <p className='text-sm mb-3'>Job Satisfaction × Environment Satisfaction</p>
                            <div className='bg-[#1F1F1F] p-3 rounded'>
                                <p className='text-xs text-gray-400'>Captures: Overall employee satisfaction through multiplicative interaction</p>
                            </div>
                        </div>
                        <div className='bg-[#2A2A2A] p-6 rounded-lg border-2 border-[#0000FF]'>
                            <p className='font-bold text-[#0000FF] mb-3'>Low_Sat_Overtime</p>
                            <p className='text-sm mb-3'>Low Satisfaction + Overtime</p>
                            <div className='bg-[#1F1F1F] p-3 rounded'>
                                <p className='text-xs text-gray-400'>Captures: High-risk combination of dissatisfied and overworked employees</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#2A2A2A] p-4 rounded-lg border-l-4 border-[#0000FF] mt-2'>
                        <p className='text-sm'><span className='font-bold'>Purpose:</span> Interaction terms reveal complex relationships that individual variables can't capture alone.</p>
                    </div>
                </div>

                {/* Feature Scaling Section */}
                <div className='flex flex-col gap-[1.3125rem]'>
                    <p className='text-[1.5rem] font-bold'>Feature Scaling</p>
                    <p>
                        We normalized numeric variables so they're on comparable scales. This is essential for machine learning algorithms to work properly.
                    </p>
                    <div className='bg-[#2A2A2A] p-6 rounded-lg border-2 border-[#0000FF] mt-[1.5rem]'>
                        <div className='flex items-center justify-between'>
                            <div className='text-center flex-1'>
                                <div className='bg-[#1F1F1F] p-4 rounded-lg border border-gray-600'>
                                    <p className='text-xs text-gray-400 mb-2'>Before Scaling</p>
                                    <p className='text-sm'>Age: 18-60</p>
                                    <p className='text-sm'>Income: 1k-20k</p>
                                    <p className='text-sm'>Years: 0-40</p>
                                    <p className='text-xs text-red-400 mt-2'>Different scales</p>
                                </div>
                            </div>
                            <div className='flex-none px-6'>
                                <div className='text-[#0000FF] text-4xl'>→</div>
                                <p className='text-xs text-center text-[#0000FF] mt-2'>Normalize</p>
                            </div>
                            <div className='text-center flex-1'>
                                <div className='bg-[#0000FF] p-4 rounded-lg'>
                                    <p className='text-xs text-gray-200 mb-2'>After Scaling</p>
                                    <p className='text-sm'>Age: 0-1</p>
                                    <p className='text-sm'>Income: 0-1</p>
                                    <p className='text-sm'>Years: 0-1</p>
                                    <p className='text-xs text-green-300 mt-2'>Comparable scales</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#2A2A2A] p-4 rounded-lg border-l-4 border-[#0000FF] mt-2'>
                        <p className='text-sm'><span className='font-bold'>Why it matters:</span> Machine learning algorithms perform better when all features are on the same scale, preventing features with larger ranges from dominating the model.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}