import { useEffect, useRef, useState } from "react";
import Plotly from 'plotly.js-dist-min'

const Correlative = () => {
   const heatmapRef = useRef(null);
   const scatterRef = useRef(null);
   const barRef = useRef(null);
   const [selectedPair, setSelectedPair] = useState({ x: 'Age', y: 'TotalWorkingYears' });

   const variables = [
      'Age',
      'Education',
      'TrainingTimesLastYear',
      'TotalWorkingYears',
      'YearsAtCompany',
      'YearsInCurrentRole',
      'YearsSinceLastPromotion',
      'MonthlyIncome',
      'PercentSalaryHike',
      'NumCompaniesWorked'
   ];

   const correlationMatrix = [
      [1.00, 0.21, -0.02, 0.68, 0.31, 0.21, 0.22, 0.50, 0.00, 0.30],
      [0.21, 1.00, -0.03, 0.15, 0.07, 0.06, 0.05, 0.09, -0.01, 0.13],
      [-0.02, -0.03, 1.00, -0.04, 0.00, -0.01, -0.00, -0.02, -0.01, -0.07],
      [0.68, 0.15, -0.04, 1.00, 0.63, 0.46, 0.40, 0.77, -0.02, 0.24],
      [0.31, 0.07, 0.00, 0.63, 1.00, 0.76, 0.62, 0.51, -0.04, -0.12],
      [0.21, 0.06, -0.01, 0.46, 0.76, 1.00, 0.55, 0.36, -0.00, -0.09],
      [0.22, 0.05, -0.00, 0.40, 0.62, 0.55, 1.00, 0.34, -0.02, -0.04],
      [0.50, 0.09, -0.02, 0.77, 0.51, 0.36, 0.34, 1.00, -0.03, 0.15],
      [0.00, -0.01, -0.01, -0.02, -0.04, -0.00, -0.02, -0.03, 1.00, -0.01],
      [0.30, 0.13, -0.07, 0.24, -0.12, -0.09, -0.04, 0.15, -0.01, 1.00]
   ];

   // Generate sample data for scatter plot
   const generateSampleData = (var1, var2, correlation) => {
      const n = 100;
      const data = [];
      for (let i = 0; i < n; i++) {
         const x = Math.random() * 100;
         const noise = (Math.random() - 0.5) * 50 * (1 - Math.abs(correlation));
         const y = x * correlation + noise + 50;
         data.push({ x, y });
      }
      return data;
   };

   useEffect(() => {
      // Heatmap
      const heatmapData = [{
         z: correlationMatrix,
         x: variables,
         y: variables,
         type: 'heatmap',
         colorscale: [
            [0, '#3B4CC0'],
            [0.25, '#8C9CD4'],
            [0.5, '#DDDDDD'],
            [0.75, '#F4A582'],
            [1, '#B40426']
         ],
         zmin: -1,
         zmax: 1,
         text: correlationMatrix.map(row =>
            row.map(val => val.toFixed(2))
         ),
         texttemplate: '%{text}',
         textfont: {
            size: 10,
            color: 'black'
         },
         showscale: true,
         colorbar: {
            thickness: 15,
            len: 0.7,
            tickfont: {
               size: 10
            }
         }
      }];

      const heatmapLayout = {
         title: {
            text: 'Correlation Heatmap',
            font: {
               size: 16,
               family: 'Arial, sans-serif',
               color: 'white'
            }
         },
         xaxis: {
            tickangle: -45,
            side: 'bottom',
            tickfont: {
               size: 8,
               color: 'white'
            }
         },
         yaxis: {
            tickfont: {
               size: 8,
               color: 'white'
            }
         },
         paper_bgcolor: '#1F1F1F',
         plot_bgcolor: '#1F1F1F',
         autosize: true,
         height: 500,
         margin: {
            l: 150,
            r: 40,
            t: 60,
            b: 150
         }
      };

      if (heatmapRef.current) {
         Plotly.newPlot(heatmapRef.current, heatmapData, heatmapLayout, { responsive: true });
      }

      // Bar chart of strongest correlations
      const strongCorrelations = [];
      for (let i = 0; i < variables.length; i++) {
         for (let j = i + 1; j < variables.length; j++) {
            const corr = correlationMatrix[i][j];
            if (Math.abs(corr) > 0.5) {
               strongCorrelations.push({
                  pair: `${variables[i]} × ${variables[j]}`,
                  value: corr
               });
            }
         }
      }
      strongCorrelations.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

      const barData = [{
         x: strongCorrelations.map(d => d.value),
         y: strongCorrelations.map(d => d.pair),
         type: 'bar',
         orientation: 'h',
         marker: {
            color: strongCorrelations.map(d => d.value > 0 ? '#F4A582' : '#8C9CD4'),
         },
         text: strongCorrelations.map(d => d.value.toFixed(2)),
         textposition: 'outside',
      }];

      const barLayout = {
         title: {
            text: 'Strongest Correlations (|r| > 0.5)',
            font: {
               size: 16,
               color: 'white'
            }
         },
         xaxis: {
            title: 'Correlation Coefficient',
            range: [-1, 1],
            tickfont: {
               color: 'white'
            },
            titlefont: {
               color: 'white'
            }
         },
         yaxis: {
            tickfont: {
               size: 8,
               color: 'white'
            }
         },
         paper_bgcolor: '#1F1F1F',
         plot_bgcolor: '#1F1F1F',
         autosize: true,
         height: 500,
         margin: {
            l: 220,
            r: 40,
            t: 60,
            b: 60
         }
      };

      if (barRef.current) {
         Plotly.newPlot(barRef.current, barData, barLayout, { responsive: true });
      }

      return () => {
         if (heatmapRef.current) {
            Plotly.purge(heatmapRef.current);
         }
         if (barRef.current) {
            Plotly.purge(barRef.current);
         }
      };
   }, []);

   useEffect(() => {
      // Scatter plot for selected pair
      const xIdx = variables.indexOf(selectedPair.x);
      const yIdx = variables.indexOf(selectedPair.y);
      const correlation = correlationMatrix[xIdx][yIdx];
      const sampleData = generateSampleData(selectedPair.x, selectedPair.y, correlation);

      const scatterData = [{
         x: sampleData.map(d => d.x),
         y: sampleData.map(d => d.y),
         mode: 'markers',
         type: 'scatter',
         marker: {
            size: 8,
            color: '#FFD900',
            opacity: 0.6
         }
      }];

      const scatterLayout = {
         title: {
            text: `${selectedPair.x} vs ${selectedPair.y}<br>(r = ${correlation.toFixed(2)})`,
            font: {
               size: 18,
               color: 'white'
            }
         },
         xaxis: {
            title: selectedPair.x,
            tickfont: {
               color: 'white'
            },
            titlefont: {
               color: 'white'
            },
            gridcolor: '#444'
         },
         yaxis: {
            title: selectedPair.y,
            tickfont: {
               color: 'white'
            },
            titlefont: {
               color: 'white'
            },
            gridcolor: '#444'
         },
         paper_bgcolor: '#1F1F1F',
         plot_bgcolor: '#1F1F1F',
         autosize: true,
         height: 600,
         margin: {
            l: 80,
            r: 40,
            t: 80,
            b: 60
         }
      };

      if (scatterRef.current) {
         Plotly.newPlot(scatterRef.current, scatterData, scatterLayout, { responsive: true });
      }

      return () => {
         if (scatterRef.current) {
            Plotly.purge(scatterRef.current);
         }
      };
   }, [selectedPair]);

   return (
      <div
         className="h-full bg-[#1F1F1F] rounded-tl-[12px] rounded-bl-[12px] text-white"
      >
         <div className='pl-[2.625rem] pt-[3.1875rem] pr-[8.875rem] pb-[5rem] flex flex-col gap-[5.25rem]'>
            {/* Header */}
            <div className='flex gap-8'>
               <div className='flex gap-4'>
                  <div className='w-[6px] h-[11rem] bg-[#FFD900]'></div>
                  <div className='w-[6px] h-[11rem] bg-[#FFD900]'></div>
                  <div className='w-[6px] h-[11rem] bg-[#FFD900]'></div>
               </div>
               <div className='font-rubik-one flex flex-col'>
                  <p className='text-[3rem]'>CORRELATIVE</p>
                  <p className='text-[5.625rem]'>ANALYSIS</p>
               </div>
            </div>

            {/* Variables Section */}
            <div className='flex flex-col gap-5'>
               <p className='text-2xl font-bold'>Variables Selected</p>
               <p>
                  These variables were selected because they are likely to show meaningful relationships with each other and help reveal patterns within the company's workforce.
               </p>
               <div className='flex flex-wrap gap-8 pt-6'>
                  {variables.map(v => (
                     <div key={v} className='w-32 h-32 flex items-center justify-center bg-white rounded-full text-black font-bold text-center text-sm leading-tight p-2'>
                        {v.replace(/([A-Z])/g, ' $1').trim()}
                     </div>
                  ))}
               </div>
            </div>

            {/* Analysis Type */}
            <div className='flex flex-col gap-5'>
               <p className='text-2xl font-bold'>Type of Analysis</p>
               <p>Pearson's correlation (positive and negative relationships) visualized using multiple chart types for easier interpretation.</p>
            </div>

            {/* Plots Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-[-3rem]'>
               <div className="bg-[#2A2A2A] p-6 rounded-lg">
                  <div ref={heatmapRef}></div>
               </div>

               <div className="bg-[#2A2A2A] p-6 rounded-lg">
                  <div ref={barRef}></div>
               </div>
            </div>

            <div className="bg-[#2A2A2A] p-6 rounded-lg mt-[-3rem]">
               <div className="mb-[1rem]">
                  <label className="block mb-2 font-bold">Select Variables to Compare:</label>
                  <div className="flex gap-4">
                     <select
                        value={selectedPair.x}
                        onChange={(e) => setSelectedPair({ ...selectedPair, x: e.target.value })}
                        className="bg-[#1F1F1F] text-white p-2 rounded border border-gray-600"
                     >
                        {variables.map(v => <option key={v} value={v}>{v}</option>)}
                     </select>
                     <span className="self-center">vs</span>
                     <select
                        value={selectedPair.y}
                        onChange={(e) => setSelectedPair({ ...selectedPair, y: e.target.value })}
                        className="bg-[#1F1F1F] text-white p-2 rounded border border-gray-600"
                     >
                        {variables.map(v => <option key={v} value={v}>{v}</option>)}
                     </select>
                  </div>
               </div>
               <div ref={scatterRef}></div>
               <p className="text-sm mt-4 text-gray-400">This scatter plot shows simulated data to demonstrate the correlation pattern</p>
            </div>

            {/* Key Findings */}
            <div className='flex flex-col gap-5 mt-[-3rem]'>
               <p className='text-2xl font-bold'>Key Findings</p>

               <div className="space-y-4">

                  <p className="font-bold text-xl text-[#FFD900]">
                     STRONG CORRELATIONS (|r| &gt; 0.6):
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                     <li>TotalWorkingYears and MonthlyIncome (0.77) - More experience leads to higher income</li>
                     <li>YearsAtCompany and YearsInCurrentRole (0.76) - Employees stay in roles as they stay with company</li>
                     <li>Age and TotalWorkingYears (0.68) - Older employees have more work experience</li>
                     <li>TotalWorkingYears and YearsAtCompany (0.63) - Experienced workers tend to stay longer</li>
                     <li>YearsAtCompany and YearsSinceLastPromotion (0.62) - Longer tenure relates to promotion timing</li>
                  </ul>

                  <p className="font-bold text-xl text-[#FFD900] pt-4">
                     MODERATE CORRELATIONS (0.3 &lt; |r| &lt; 0.6):
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                     <li>YearsInCurrentRole and YearsSinceLastPromotion (0.55)</li>
                     <li>YearsAtCompany and MonthlyIncome (0.51)</li>
                     <li>Age and MonthlyIncome (0.50)</li>
                     <li>TotalWorkingYears and YearsInCurrentRole (0.46)</li>
                     <li>TotalWorkingYears and YearsSinceLastPromotion (0.40)</li>
                  </ul>

                  <p className="font-bold text-xl text-[#FFD900] pt-4">WEAK/NO CORRELATIONS:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                     <li>PercentSalaryHike shows almost no correlation with other variables</li>
                     <li>TrainingTimesLastYear is largely independent of other factors</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Correlative