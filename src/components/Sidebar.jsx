import React from 'react'
import { Link } from 'react-router-dom'
import NodesIcon from '../assets/NodesIcon'

const Sidebar = () => {
   return (
      <aside className=' w-[23.6875rem] pt-[3.125rem] flex flex-col bg-[#F4F4F4] items-center gap-[4.0625rem]'>
         <div className='flex gap-[1.4375rem] justify-center items-center'>
            <NodesIcon />
            <div className='font-rubik-one text-[2rem] flex flex-col'>
               <p>HR <br></br> ANALYTICS</p>
            </div>
         </div>
         <div className='flex flex-col gap-[1.875rem]'>
            <Link
               className='flex flex-col items-center justify-center gap-[0.5625rem]'
               to="/dataset"
            >
               <p className='font-bold text-[1rem] text-black'>
                  DATASET
               </p>
               <div className='h-[5px] w-[14.6875rem] bg-[#FF5733]'>
               </div>
            </Link>
            <Link
               className='flex flex-col items-center justify-center gap-[0.5625rem]'
               to="/theoreticalframework"
            >
               <p className='font-bold text-[1rem] text-black'>
                  THEORETICAL FRAMEWORK
               </p>
               <div className='h-[5px] w-[14.6875rem] bg-[#00FF00]'>
               </div>
            </Link>
            <Link
               className='flex flex-col items-center justify-center gap-[0.5625rem]'
               to="/datapreprocessing"
            >
               <p className='font-bold text-[1rem] text-black'>
                  DATA PREPROCESSING
               </p>
               <div className='h-[5px] w-[14.6875rem] bg-[#0000FF]'>
               </div>
            </Link>
            <Link
               className='flex flex-col items-center justify-center gap-[0.5625rem]'
               to="/correlative"
            >
               <p className='font-bold text-[1rem] text-black'>
                  CORRELATIVE ANALYSIS
               </p>
               <div className='h-[5px] w-[14.6875rem] bg-[#FFD900]'>
               </div>
            </Link>
            <Link
               className='flex flex-col items-center justify-center gap-[0.5625rem]'
               to="/descriptive"
            >
               <p className='po font-bold text-[1rem] text-black'>
                  DESCRIPTIVE ANALYSIS
               </p>
               <div className='h-[5px] w-[14.6875rem] bg-[#00B2FF]'>
               </div>
            </Link>
            <Link
               className='flex flex-col items-center justify-center gap-[0.5625rem]'
               to="/predictive"
            >
               <p className='po font-bold text-[1rem] text-black'>
                  PREDICTIVE ANALYSIS
               </p>
               <div className='h-[5px] w-[14.6875rem] bg-[#FF00DD]'>
               </div>
            </Link>
         </div>
      </aside>
   )
}

export default Sidebar
