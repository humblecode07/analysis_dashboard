import { useEffect, useRef } from "react";
import Plotly from 'plotly.js-dist-min'

const Correlative = () => {
   const plotRef = useRef(null);

   useEffect(() => {
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

      const data = [{
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
            size: 12,
            color: 'black'
         },
         showscale: true,
         colorbar: {
            thickness: 20,
            len: 0.7,
            tickfont: {
               size: 12
            }
         }
      }];

      const layout = {
         title: {
            text: 'Correlation Heatmap - HR Analytics',
            font: {
               size: 20,
               family: 'Arial, sans-serif',
               color: 'white'
            }
         },
         xaxis: {
            tickangle: -45,
            side: 'bottom',
            tickfont: {
               size: 11,
               color: 'white'
            }
         },
         yaxis: {
            tickfont: {
               size: 11,
               color: 'white'
            }
         },
         paper_bgcolor: '#1F1F1F',
         plot_bgcolor: '#1F1F1F',
         width: 1000,
         height: 800,
         margin: {
            l: 150,
            r: 100,
            t: 80,
            b: 150
         }
      };

      const config = {
         responsive: true
      };

      if (plotRef.current) {
         Plotly.newPlot(plotRef.current, data, layout, config);
      }

      return () => {
         if (plotRef.current) {
            Plotly.purge(plotRef.current);
         }
      };
   }, []);

   return (
      <div
         className="h-full bg-[#1F1F1F] rounded-tl-[12px] rounded-bl-[12px] text-white"
      >
         <div className='pl-[2.625rem] pt-[3.1875rem] pr-[8.875rem] pb-[5rem] flex flex-col gap-[5.25rem]'>
            <div className='flex gap-[2rem]'>
               <div className='flex gap-[0.9375rem]'>
                  <div className='w-[6px] h-[11rem] bg-[#FFD900]'></div>
                  <div className='w-[6px] h-[11rem] bg-[#FFD900]'></div>
                  <div className='w-[6px] h-[11rem] bg-[#FFD900]'></div>
               </div>
               <div className='font-rubik-one flex flex-col'>
                  <p className='text-[3rem]'>CORRELATIVE</p>
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
                     Age
                  </div>
                  <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                     Education
                  </div>
                  <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center leading-tight'>
                     Training<br />Times<br />Last<br />Year
                  </div>
                  <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center leading-tight'>
                     Years At<br />Company
                  </div>
                  <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center leading-tight'>
                     Num<br />Companies<br />Worked
                  </div>
                  <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center leading-tight'>
                     Years<br />Since<br />Last<br />Promotion
                  </div>
                  <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center leading-tight'>
                     Percent<br />Salary<br />Hike
                  </div>
                  <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center leading-tight'>
                     Years<br />In<br />Current<br />Role
                  </div>
                  <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center leading-tight'>
                     Monthly<br />Increase
                  </div>
               </div>
            </div>
            <div className='flex flex-col gap-[1.3125rem]'>
               <p className='text-[1.5rem] font-bold'>Type of Analysis</p>
               <p>Pearson's correlation (positive and negative relationships) visualized using a heatmap.</p>
               <div ref={plotRef} className="w-full flex-1 min-h-[400px] mt-4"></div>
               <div class="flex flex-col space-y-2">
                  <p class="font-bold text-[1.25rem]">STRONG CORRELATIONS:</p>
                  <ul class="list-disc list-inside space-y-5">
                     <li>Age and TotalWorkingYears have a strong positive correlation (0.68)</li>
                     <li>TotalWorkingYears and YearsAtCompany have a strong positive correlation (0.63)</li>
                     <li>TotalWorkingYears and MonthlyIncome have a strong positive correlation (0.77)</li>
                     <li>YearsAtCompany and YearsInCurrentRole have a strong positive correlation (0.76)</li>
                     <li>YearsAtCompany and YearsSinceLastPromotion have a strong positive correlation (0.62)</li>
                     <li>YearsAtCompany and MonthlyIncome have a strong positive correlation (0.51)</li>
                     <li>YearsInCurrentRole and YearsSinceLastPromotion have a strong positive correlation (0.55)</li>
                  </ul>

                  <p class="font-bold mt-4 text-[1.25rem]">MODERATE CORRELATIONS:</p>
                  <ul class="list-disc list-inside space-y-5">
                     <li>Age and YearsAtCompany have a moderate positive correlation (0.31)</li>
                     <li>Age and MonthlyIncome have a moderate positive correlation (0.50)</li>
                     <li>TotalWorkingYears and YearsInCurrentRole have a moderate positive correlation (0.46)</li>
                     <li>TotalWorkingYears and YearsSinceLastPromotion have a moderate positive correlation (0.40)</li>
                     <li>YearsInCurrentRole and MonthlyIncome have a moderate positive correlation (0.36)</li>
                     <li>YearsSinceLastPromotion and MonthlyIncome have a moderate positive correlation (0.34)</li>
                  </ul>
               </div>

            </div>
         </div>
      </div>
   )
}

export default Correlative