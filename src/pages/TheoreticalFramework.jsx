import React from 'react'

export const TheoreticalFramework = () => {
  return (
    <div className="h-full bg-[#1F1F1F] rounded-tl-[12px] rounded-bl-[12px] text-white">
      <div className='pl-[2.625rem] pt-[3.1875rem] pr-[8.875rem] pb-[5rem] flex flex-col gap-[5.25rem]'>
        {/* Header Section */}
        <div className='flex gap-[2rem]'>
          <div className='flex gap-[0.9375rem]'>
            <div className='w-[6px] h-[11rem] bg-[#00FF00]'></div>
            <div className='w-[6px] h-[11rem] bg-[#00FF00]'></div>
            <div className='w-[6px] h-[11rem] bg-[#00FF00]'></div>
          </div>
          <div className='font-rubik-one flex flex-col'>
            <p className='text-[3rem]'>THEORETICAL</p>
            <p className='text-[5.625rem]'>FRAMEWORK</p>
          </div>
        </div>

        {/* Correlation Analysis Section */}
        <div className='flex flex-col gap-[1.3125rem]'>
          <p className='text-[1.5rem] font-bold'>Correlation Analysis</p>
          <p>
            The correlation analysis framework is grounded in Human Capital Theory, which posits that organizational investments in employees' knowledge, skills, and abilities enhance productivity and reduce turnover (Schultz, 1961; Becker, 1964). This theoretical perspective is supported by Gross et al. (2015), who examined employee voluntary turnover in relation to organizational investment in human capital, demonstrating that greater investment is associated with improved employee retention outcomes.
          </p>
          <div className='flex flex-wrap gap-[1.5rem] pt-[1.5rem]'>
            <div className='bg-[#2A2A2A] p-4 rounded-lg border-l-4 border-[#00FF00]'>
              <p className='text-sm text-gray-400 mb-2'>Key Reference:</p>
              <p className='text-sm'>Gross et al. (2015) - Human Capital Investment Theory and Theory of the Firm</p>
            </div>
            <div className='bg-[#2A2A2A] p-4 rounded-lg border-l-4 border-[#00FF00]'>
              <p className='text-sm text-gray-400 mb-2'>Foundational Work:</p>
              <p className='text-sm'>Schultz (1961), Becker (1964) - Investment in Human Capital</p>
            </div>
          </div>
        </div>

        {/* Descriptive Analysis Section */}
        <div className='flex flex-col gap-[1.3125rem]'>
          <p className='text-[1.5rem] font-bold'>Descriptive Analysis</p>
          <p>
            Herzberg's Two-Factor Theory provides a fundamental descriptive framework by distinguishing between factors that influence job satisfaction and dissatisfaction. According to Herzberg (1959), motivators such as achievement, recognition, responsibility, and growth contribute to job satisfaction, while hygiene factors including salary, job security, organizational policies, and working conditions primarily prevent dissatisfaction. This distinction is further supported by Shinde et al. (2025), who emphasize that motivators foster employee commitment, whereas hygiene factors reduce dissatisfaction and turnover.
          </p>
          <div className='flex gap-[3rem] pt-[1.5rem]'>
            <div className='flex-1'>
              <div className='bg-[#2A2A2A] p-6 rounded-lg border-2 border-[#00FF00]'>
                <p className='font-bold text-[#00FF00] mb-3'>Motivators</p>
                <ul className='text-sm space-y-1 list-disc list-inside'>
                  <li>Achievement</li>
                  <li>Recognition</li>
                  <li>Responsibility</li>
                  <li>Growth</li>
                </ul>
                <p className='text-xs text-gray-400 mt-3'>→ Job Satisfaction</p>
              </div>
            </div>
            <div className='flex-1'>
              <div className='bg-[#2A2A2A] p-6 rounded-lg border-2 border-[#00FF00]'>
                <p className='font-bold text-[#00FF00] mb-3'>Hygiene Factors</p>
                <ul className='text-sm space-y-1 list-disc list-inside'>
                  <li>Salary</li>
                  <li>Job Security</li>
                  <li>Organizational Policies</li>
                  <li>Working Conditions</li>
                </ul>
                <p className='text-xs text-gray-400 mt-3'>→ Prevent Dissatisfaction</p>
              </div>
            </div>
          </div>
          <div className='bg-[#2A2A2A] p-4 rounded-lg border-l-4 border-[#00FF00] mt-2'>
            <p className='text-sm text-gray-400 mb-2'>Reference:</p>
            <p className='text-sm'>Herzberg (1959) - The Motivation to Work; Shinde et al. (2025)</p>
          </div>
        </div>

        {/* Predictive Analysis Section */}
        <div className='flex flex-col gap-[1.3125rem]'>
          <p className='text-[1.5rem] font-bold'>Predictive Analysis</p>
          <p>
            The predictive framework is grounded in Social Exchange Theory, which explains employee retention through reciprocal relationships between organizational investments and employee loyalty. M. Nawaz et al. (2016) validates this approach by demonstrating the mediating role of organizational commitment in the relationship between human resource development factors and turnover intention based on social exchange theory principles.
          </p>
          <div className='bg-[#2A2A2A] p-6 rounded-lg border-2 border-[#00FF00] mt-[1.5rem]'>
            <div className='flex items-center justify-between mb-4'>
              <div className='text-center flex-1'>
                <div className='w-[8rem] h-[8rem] mx-auto flex items-center justify-center bg-white rounded-full text-black font-bold text-center text-sm leading-tight'>
                  Organizational<br />Investments
                </div>
              </div>
              <div className='flex-none px-4'>
                <div className='text-[#00FF00] text-3xl'>→</div>
              </div>
              <div className='text-center flex-1'>
                <div className='w-[8rem] h-[8rem] mx-auto flex items-center justify-center bg-white rounded-full text-black font-bold text-center text-sm leading-tight'>
                  Organizational<br />Commitment
                </div>
              </div>
              <div className='flex-none px-4'>
                <div className='text-[#00FF00] text-3xl'>→</div>
              </div>
              <div className='text-center flex-1'>
                <div className='w-[8rem] h-[8rem] mx-auto flex items-center justify-center bg-white rounded-full text-black font-bold text-center text-sm leading-tight'>
                  Employee<br />Retention
                </div>
              </div>
            </div>
            <p className='text-xs text-center text-gray-400 mt-4'>Social Exchange Theory Model</p>
          </div>
          <div className='bg-[#2A2A2A] p-4 rounded-lg border-l-4 border-[#00FF00] mt-2'>
            <p className='text-sm text-gray-400 mb-2'>Key Reference:</p>
            <p className='text-sm'>M. Nawaz et al. (2016) - The Relationship between Human Resource Development Factors and Turnover Intention</p>
          </div>
        </div>
      </div>
    </div>
  )
}