import React, { useEffect, useRef } from 'react'
import * as Plotly from 'plotly.js-dist-min'

const Descriptive = () => {
   const plotRef = useRef(null);
   const attritionPlotRef = useRef(null);
   const attritionRatePlotRef = useRef(null);
   const ageDistributionPlotRef = useRef(null);

   useEffect(() => {
      const jobRoles = [
         'Sales Executive',
         'Research Scientist',
         'Laboratory Technician',
         'Manufacturing Director',
         'Healthcare Representative',
         'Manager',
         'Sales Representative',
         'Research Director',
         'Human Resources'
      ];

      const generateData = (median, q1, q3, min, max, outliers = []) => {
         const data = [];
         const iqr = q3 - q1;

         // Generate points within the box
         for (let i = 0; i < 30; i++) {
            const rand = Math.random();
            if (rand < 0.25) {
               data.push(q1 + Math.random() * (median - q1));
            } else if (rand < 0.75) {
               data.push(median + Math.random() * (q3 - median));
            } else {
               const whiskerLow = Math.max(min, q1 - 1.5 * iqr);
               const whiskerHigh = Math.min(max, q3 + 1.5 * iqr);
               if (Math.random() < 0.5) {
                  data.push(whiskerLow + Math.random() * (q1 - whiskerLow));
               } else {
                  data.push(q3 + Math.random() * (whiskerHigh - q3));
               }
            }
         }

         return [...data, ...outliers];
      };

      const data = [
         {
            y: generateData(6500, 5500, 8500, 4000, 14000),
            name: 'Sales Executive',
            type: 'box',
            marker: { color: '#2b7ba0' }
         },
         {
            y: generateData(3000, 2500, 4000, 1200, 10000, [7000, 7200, 9800]),
            name: 'Research Scientist',
            type: 'box',
            marker: { color: '#2b7ba0' }
         },
         {
            y: generateData(3000, 2500, 4000, 1200, 7500, [6500, 7500]),
            name: 'Laboratory Technician',
            type: 'box',
            marker: { color: '#2b7ba0' }
         },
         {
            y: generateData(6500, 5000, 9500, 4000, 14000),
            name: 'Manufacturing Director',
            type: 'box',
            marker: { color: '#2b7ba0' }
         },
         {
            y: generateData(7000, 6000, 10000, 4000, 14000),
            name: 'Healthcare Representative',
            type: 'box',
            marker: { color: '#2b7ba0' }
         },
         {
            y: generateData(17500, 16500, 19000, 12500, 20000, [11500, 11800, 12000]),
            name: 'Manager',
            type: 'box',
            marker: { color: '#2b7ba0' }
         },
         {
            y: generateData(2500, 2500, 2800, 1200, 7000, [4000, 4500, 5500, 6800]),
            name: 'Sales Representative',
            type: 'box',
            marker: { color: '#2b7ba0' }
         },
         {
            y: generateData(16500, 14000, 19000, 11000, 20000),
            name: 'Research Director',
            type: 'box',
            marker: { color: '#2b7ba0' }
         },
         {
            y: generateData(3000, 2500, 5500, 1500, 11000),
            name: 'Human Resources',
            type: 'box',
            marker: { color: '#2b7ba0' }
         }
      ];

      const layout = {
         title: {
            text: 'Monthly Income by Job Role',
            font: { size: 18 }
         },
         xaxis: {
            title: 'Job Role',
            tickangle: -45
         },
         yaxis: {
            title: 'Monthly Income',
            range: [0, 21000]
         },
         showlegend: false,
         margin: {
            b: 150,
            l: 80,
            r: 50,
            t: 80
         },
         plot_bgcolor: 'white',
         paper_bgcolor: 'white'
      };

      // Bar chart data for attrition by department
      const attritionData = [{
         x: ['Human Resources', 'Research & Development', 'Sales'],
         y: [12, 133, 92],
         type: 'bar',
         marker: { color: '#2b7ba0' }
      }];

      const attritionLayout = {
         title: {
            text: 'Attrition Count by Department',
            font: { size: 18 }
         },
         xaxis: {
            title: 'Department'
         },
         yaxis: {
            title: 'Number of Attritions',
            range: [0, 140]
         },
         showlegend: false,
         margin: {
            b: 80,
            l: 80,
            r: 50,
            t: 80
         },
         plot_bgcolor: 'white',
         paper_bgcolor: 'white'
      };

      // Bar chart data for attrition rate by department
      const attritionRateData = [{
         x: ['Human Resources', 'Research & Development', 'Sales'],
         y: [0.19, 0.14, 0.206],
         type: 'bar',
         marker: { color: '#2b7ba0' }
      }];

      const attritionRateLayout = {
         title: {
            text: 'Attrition Rate by Department',
            font: { size: 18 }
         },
         xaxis: {
            title: 'Department'
         },
         yaxis: {
            title: 'Attrition Rate',
            range: [0, 0.225]
         },
         showlegend: false,
         margin: {
            b: 80,
            l: 80,
            r: 50,
            t: 80
         },
         plot_bgcolor: 'white',
         paper_bgcolor: 'white'
      };

      // Age Distribution histogram with line
      const ageDistributionData = [
         {
            x: [18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60],
            y: [28, 30, 40, 65, 95, 130, 135, 140, 147, 108, 138, 78, 73, 43, 50, 38, 28, 18, 28, 18, 28],
            type: 'bar',
            marker: {
               color: '#5DADE2',
               line: { color: '#2E86AB', width: 1 }
            },
            name: 'Frequency'
         },
         {
            x: [18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60],
            y: [28, 30, 40, 65, 95, 130, 135, 140, 147, 108, 138, 78, 73, 43, 50, 38, 28, 18, 28, 18, 28],
            type: 'scatter',
            mode: 'lines',
            line: { color: '#1F618D', width: 2 },
            name: 'Trend'
         }
      ];

      const ageDistributionLayout = {
         title: {
            text: 'Age Distribution',
            font: { size: 18 }
         },
         xaxis: {
            title: 'Age',
            range: [15, 62]
         },
         yaxis: {
            title: 'Number of Employees',
            range: [0, 150]
         },
         showlegend: false,
         margin: {
            b: 80,
            l: 80,
            r: 50,
            t: 80
         },
         plot_bgcolor: 'white',
         paper_bgcolor: 'white',
         bargap: 0.05
      };

      if (plotRef.current) {
         Plotly.newPlot(plotRef.current, data, layout, { responsive: true });
      }

      if (attritionPlotRef.current) {
         Plotly.newPlot(attritionPlotRef.current, attritionData, attritionLayout, { responsive: true });
      }

      if (attritionRatePlotRef.current) {
         Plotly.newPlot(attritionRatePlotRef.current, attritionRateData, attritionRateLayout, { responsive: true });
      }

      if (ageDistributionPlotRef.current) {
         Plotly.newPlot(ageDistributionPlotRef.current, ageDistributionData, ageDistributionLayout, { responsive: true });
      }
   }, []);

   return (
      <div
         className="h-full bg-[#1F1F1F] rounded-tl-[12px] rounded-bl-[12px] text-white"
      >
         <div className='pl-[2.625rem] pt-[3.1875rem] pr-[8.875rem] pb-[5rem] flex flex-col gap-[5.25rem]'>
            <div className='flex gap-[2rem]'>
               <div className='flex gap-[0.9375rem]'>
                  <div className='w-[6px] h-[11rem] bg-[#00B2FF]'></div>
                  <div className='w-[6px] h-[11rem] bg-[#00B2FF]'></div>
                  <div className='w-[6px] h-[11rem] bg-[#00B2FF]'></div>
               </div>
               <div className='font-rubik-one flex flex-col'>
                  <p className='text-[3rem]'>DESCRIPTIVE</p>
                  <p className='text-[5.625rem]'>ANALYSIS</p>
               </div>
            </div>
            <div className='flex flex-col gap-[1.3125rem]'>
               <p className='text-[1.5rem] font-bold'>Variables Selected</p>
               <p>
                  These variables were selected because they are likely to show meaningful relationships with each other and help reveal patterns within the company's workforce.
               </p>
               <div className='flex flex-wrap gap-[3rem] pt-[1.5rem]'>
                  <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                     Department
                  </div>
                  <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                     JobRole
                  </div>
                  <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center leading-tight'>
                     Age
                  </div>
                  <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center leading-tight'>
                     Monthly<br />Increase
                  </div>
                  <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center leading-tight'>
                     Num<br />Companies<br />Worked
                  </div>
                  <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center leading-tight'>
                     Attrition
                  </div>
               </div>
            </div>
            <div className='flex flex-col gap-[1.3125rem]'>
               <p className='text-[1.5rem] font-bold'>Type of Analysis</p>
               <p>Figure 1. Bar Chart</p>
               <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6 flex flex-col">
                  <div ref={attritionPlotRef} className="w-full" style={{ height: '500px' }} />
                  <div className='border-solid border-[2px] border-black p-2'>
                     <p className='text-black'>
                        The bar chart shows that Research & Development has the highest attrition count, with around 130 employees leaving, followed by Sales with about 90, and Human Resources with only about 12–15 leavers.
                     </p>
                  </div>
               </div>
               <p>Figure 2. Bar Chart</p>
               <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
                  <div ref={attritionRatePlotRef} className="w-full" style={{ height: '500px' }} />
                  <div className='border-solid border-[2px] border-black p-2'>
                     <p className='text-black'>
                        The chart shows that Sales has the highest attrition rate (about 21%), indicating that a larger proportion of employees leave Sales than any other department. Human Resources is close behind (around 19%), suggesting non-trivial turnover despite its smaller headcount. Research & Development has the lowest attrition rate (around 14%), meaning it retains a greater share of its employees compared with Sales and HR.
                     </p>
                  </div>
               </div>
               <p>Figure 3. Box Plot (or Box-and-Whisker Plot).</p>
               <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
                  <div ref={plotRef} className="w-full" style={{ height: '600px' }} />
                  <div className='border-solid border-[2px] border-black p-2'>
                     <p className='text-black'>
                        The box plot indicates that Managers and Research Directors receive the highest median monthly incomes and show the widest pay ranges, reflecting seniority and performance-based variability. Mid- to upper-tier roles like Manufacturing Director and Healthcare Representative also earn relatively high median incomes, while Laboratory Technicians, Sales Representatives, Research Scientists, and HR staff are clustered at the lower end of the pay scale, making them more vulnerable to financial dissatisfaction and potential turnover. Numerous outliers—especially in Sales and technical roles—suggest pockets of possible pay inequity within the same job titles.
                     </p>
                  </div>
               </div>
               <p>Figure 4. Age Distribution</p>
               <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
                  <div ref={ageDistributionPlotRef} className="w-full" style={{ height: '500px' }} />
                  <div className='border-solid border-[2px] border-black p-2'>
                     <p className='text-black'>
                        The age histogram shows that the workforce is heavily concentrated from the late 20s to late 30s, with the peak around ages 30–35. There are fewer employees below 25 and above 50, indicating a relatively young, early- to mid‑career population. This younger profile implies higher mobility and a greater risk of job-hopping, so strong development and career progression programs are crucial for retention.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Descriptive