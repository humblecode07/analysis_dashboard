import React, { useEffect, useRef } from 'react'
import * as Plotly from 'plotly.js-dist-min'


const Predictive = () => {
   const chartRef = useRef(null);
   const confusionMatrixRef = useRef(null);

   useEffect(() => {
      if (chartRef.current) {
         const features = [
            'Is_MidCareer',
            'JobSatisfaction',
            'Income_Per_Age',
            'Income_Per_Experience',
            'HighRisk_Profile',
            'Age',
            'EnvironmentSatisfaction',
            'MonthlyIncome',
            'Total_Dissatisfaction',
            'Satisfaction_Product',
            'LowSat_Overtime',
            'TotalWorkingYears',
            'Young_Overworked',
            'OverTime',
            'Experience_Squared'
         ];

         const importanceScores = [
            0.028,
            0.042,
            0.047,
            0.048,
            0.052,
            0.056,
            0.057,
            0.059,
            0.061,
            0.063,
            0.075,
            0.077,
            0.082,
            0.127,
            0.131
         ];

         const colors = [
            '#E8F48C', '#E8F48C', '#D4ED5A', '#BFDC42',
            '#9BC93A', '#7AB933', '#5FA830', '#4FA030',
            '#3F9A3A', '#2F8F47', '#238B5D', '#1A8670',
            '#157B7F', '#136E8A', '#0F5C8F'
         ];

         const data = [{
            type: 'bar',
            x: importanceScores,
            y: features,
            orientation: 'h',
            marker: {
               color: colors,
            },
            text: importanceScores.map(score => score.toFixed(2)),
            textposition: 'none',
            hovertemplate: '<b>%{y}</b><br>Importance: %{x:.3f}<extra></extra>'
         }];

         const layout = {
            title: {
               text: 'What Drives Employee Turnover? (XGBoost)',
               font: {
                  size: 20,
                  color: '#000',
                  family: 'Arial, sans-serif'
               },
               x: 0.5,
               xanchor: 'center'
            },
            xaxis: {
               title: {
                  text: 'Importance Score (Gain)',
                  font: { size: 14, color: '#000' }
               },
               gridcolor: '#e0e0e0',
               tickfont: { color: '#000' }
            },
            yaxis: {
               tickfont: { size: 12, color: '#000' },
               automargin: true
            },
            plot_bgcolor: '#ffffff',
            paper_bgcolor: '#ffffff',
            margin: { l: 150, r: 50, t: 80, b: 80 },
            height: 600,
            showlegend: false
         };

         const config = {
            responsive: true,
            displayModeBar: true,
            displaylogo: false
         };

         Plotly.newPlot(chartRef.current, data, layout, config);

         // Confusion Matrix
         if (confusionMatrixRef.current) {
            const confusionData = [{
               z: [[98, 149], [5, 42]],
               x: ['Predicted: Stayed', 'Predicted: Left'],
               y: ['Actual: Stayed', 'Actual: Left'],
               type: 'heatmap',
               colorscale: 'Blues',
               text: [[98, 149], [5, 42]],
               texttemplate: '%{text}',
               textfont: { size: 16, color: 'white' },
               hovertemplate: '%{y} | %{x}<br>Count: %{z}<extra></extra>',
               colorbar: { title: 'Count' }
            }];

            const confusionLayout = {
               title: {
                  text: 'Confusion Matrix (Test Set)',
                  font: { size: 20, color: '#000', family: 'Arial, sans-serif' },
                  x: 0.5,
                  xanchor: 'center'
               },
               xaxis: {
                  title: { text: 'Predicted Label', font: { size: 14, color: '#000' } },
                  tickfont: { color: '#000' }
               },
               yaxis: {
                  title: { text: 'Actual Label', font: { size: 14, color: '#000' } },
                  tickfont: { color: '#000' }
               },
               plot_bgcolor: '#ffffff',
               paper_bgcolor: '#ffffff',
               margin: { l: 100, r: 100, t: 80, b: 80 },
               height: 500
            };

            const confusionConfig = {
               responsive: true,
               displayModeBar: true,
               displaylogo: false
            };

            Plotly.newPlot(confusionMatrixRef.current, confusionData, confusionLayout, confusionConfig);
         }
      }

      return () => {
         if (chartRef.current) {
            Plotly.purge(chartRef.current);
         }
         if (confusionMatrixRef.current) {
            Plotly.purge(confusionMatrixRef.current);
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
                  <div className='w-[6px] h-[11rem] bg-[#FF00DD]'></div>
                  <div className='w-[6px] h-[11rem] bg-[#FF00DD]'></div>
                  <div className='w-[6px] h-[11rem] bg-[#FF00DD]'></div>
               </div>
               <div className='font-rubik-one flex flex-col'>
                  <p className='text-[3rem]'>PREDICTIVE</p>
                  <p className='text-[5.625rem]'>ANALYSIS</p>
               </div>
            </div>
            <div className='flex flex-col gap-[1.3125rem]'>
               <p className='text-[1.5rem] font-bold'>Variables Selected</p>
               <p>
                  The model uses key demographic and job-related variables—such as Age, TotalWorkingYears, MonthlyIncome, OverTime, JobSatisfaction, and EnvironmentSatisfaction—to represent career stage, workload, financial satisfaction, and overall work climate. Engineered features capture deeper patterns, highlighting risk combinations like young employees with heavy overtime or workers experiencing both low satisfaction and low income. Non-linear transformations, such as Experience_Squared, help represent career-stage turnover trends.
               </p>
               <div className='flex flex-col gap-[1.625rem]'>
                  <p className='text-[1.25rem] font-bold'>Dependent Variable(s)</p>
                  <div className='flex flex-wrap gap-[3rem] pt-[1.5rem]'>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        Attrition
                     </div>
                  </div>
               </div>
               <div className='flex flex-col gap-[1.625rem]'>
                  <p className='text-[1.25rem] font-bold'>Independent Variable(s)</p>
                  <div className='flex flex-wrap gap-[3rem] pt-[1.5rem]'>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        Monthly<br />Income
                     </div>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        Total <br /> Working <br /> Years
                     </div>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        OverTime
                     </div>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        Job <br /> Satisfaction
                     </div>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        Environment <br /> Satisfaction
                     </div>
                  </div>
               </div>
               <div className='flex flex-col gap-[1.625rem]'>
                  <p className='text-[1.25rem] font-bold'>Engineered Variable(s)</p>
                  <div className='flex flex-wrap gap-[3rem] pt-[1.5rem]'>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        Low <br /> Satisfaction <br /> Overtime
                     </div>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        Satisfaction <br /> Product
                     </div>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        Income <br /> Per<br /> Age
                     </div>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        Income <br /> Per <br /> Experience
                     </div>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        Is <br /> Early <br /> Career
                     </div>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        Is <br /> Mid <br /> Career
                     </div>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        Experienced <br /> Squared
                     </div>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        Low <br /> Experience
                     </div>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        Total <br /> Dissatisfaction
                     </div>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        High <br /> Risk <br /> Profile
                     </div>
                     <div className='w-[8.5625rem] h-[8.5625rem] flex items-center justify-center bg-white rounded-full text-black font-bold text-center'>
                        Young <br /> Overlooked
                     </div>
                  </div>
               </div>
            </div>
            <div className='flex flex-col gap-[1.3125rem]'>
               <p className='text-[1.5rem] font-bold'>Confusion Matrix</p>
               <div className='bg-white rounded-lg p-6'>
                  <div ref={confusionMatrixRef} />
               </div>
               <div className='bg-[#2a2a2a] rounded-lg p-6 border border-[#00B2FF]'>
                  <p className='font-bold text-[1.1rem] mb-4'>🔍 Detailed Breakdown</p>
                  <div className='grid grid-cols-2 gap-4 text-[0.95rem]'>
                     <div><span className='font-bold'>True Negatives:</span> 98 (correctly predicted stayed)</div>
                     <div><span className='font-bold'>False Positives:</span> 149 (predicted left, actually stayed)</div>
                     <div><span className='font-bold'>False Negatives:</span> 5 (predicted stayed, actually left)</div>
                     <div><span className='font-bold'>True Positives:</span> 42 (correctly predicted left)</div>
                  </div>
                  <div className='mt-4 pt-4 border-t border-gray-600'>
                     <p className='text-[1rem] font-bold text-[#FFD700]'>Key Insights:</p>
                     <div className='flex flex-col gap-2 mt-2 text-[0.95rem]'>
                        <div><span className='font-bold'>Recall for 'Left' class:</span> 89.4% (catching 42 out of 47 leavers)</div>
                        <div><span className='font-bold'>Precision for 'Left' class:</span> 22.0% (42 correct out of 191 predictions)</div>
                     </div>
                  </div>
               </div>
            </div>

            <p className='text-[1.5rem] font-bold'>eXtreme Gradient Boosting (supervised learning).</p>
            <div className='bg-white rounded-lg p-6 mt-[-3rem]'>
               <div ref={chartRef} />
            </div>
            <div className="flex flex-col space-y-2">
               <p className="font-bold text-[1.25rem]">Insights:</p>
               <ul className='flex flex-col gap-[1rem] text-[0.95rem] list-disc pl-[1.5rem]'>
                  <li><strong>Experience_Squared</strong> shows the strongest influence on turnover, indicating a non-linear pattern where employees are more likely to resign during early-career and mid-career transition stages.</li>
                  <li><strong>OverTime</strong> is the second most important factor, highlighting that heavy workload and extended hours significantly drive employees to leave.</li>
                  <li><strong>Young_Overworked</strong> ranks next, showing that early-career employees who are already experiencing overtime pressures face an elevated risk of turnover.</li>
                  <li><strong>TotalWorkingYears</strong> remains a key predictor, reinforcing that career stage and accumulated experience shape resignation behavior.</li>
                  <li><strong>LowSat_Overtime</strong> is also highly influential, demonstrating that overtime becomes especially harmful when paired with low job satisfaction.</li>
                  <li><strong>Satisfaction_Product</strong> and <strong>Total_Dissatisfaction</strong> contribute substantially, indicating that lower satisfaction across multiple dimensions increases the likelihood of attrition.</li>
                  <li><strong>MonthlyIncome</strong> plays a moderate role, suggesting that compensation affects turnover decisions but is less dominant compared to workload and satisfaction.</li>
                  <li><strong>EnvironmentSatisfaction</strong> and <strong>JobSatisfaction</strong> further support the importance of workplace climate, with lower satisfaction linked to higher resignation risk.</li>
                  <li><strong>Age</strong> contributes to turnover prediction, mainly as part of the broader experience-related patterns captured by other features.</li>
                  <li><strong>HighRisk_Profile</strong> captures compounded risk, identifying employees who face the combined effects of overtime, low satisfaction, and low pay.</li>
                  <li><strong>Income_Per_Experience</strong> and <strong>Income_Per_Age</strong> show that compensation fairness relative to experience and age matters, but at a lower magnitude.</li>
                  <li><strong>Is_MidCareer</strong> has the least impact, suggesting that mid-career status alone is not a strong predictor unless paired with other stressors.</li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default Predictive