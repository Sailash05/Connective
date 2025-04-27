import React from 'react'

import { statistics } from '../../../utils/constants'

const MainSection = () => {
    return (
        <section className='mt-[5rem] max-sm:mt-[3.5rem] h-[calc(100dvh-5rem)] max-sm:h-[calc(100dvh-3.5rem)] px-[12rem] dark:bg-gray-950 max-sm:px-[2rem]'>


            <div className='flex h-3/4 max-sm:h-fit max-sm:flex-col-reverse'>
                <div className='h-full max-sm:h-full w-1/2 max-sm:w-full flex flex-col gap-10 max-sm:gap-5 justify-center'>
                    <h1 className='text-4xl max-sm:text-3xl font-extrabold dark:text-white'>
                        Grow Your Business
                        <br />
                        With <span className='text-blue-600'>Connective</span>
                    </h1>
                    <p className='text-m max-sm:text-sm text-slate-800 dark:text-slate-200'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus unde minima.</p>
                    <button className='w-fit px-10 py-4 max-sm:px-8 max-sm:py-3 bg-blue-600 border-none text-white rounded-full cursor-pointer hover:bg-blue-700 transition-colors'>
                        Get Started  <img src="/asserts/front-page-logos/right-arrow.png" alt="arrow icon" className='invert-[100%] inline w-[0.85rem] z-0' />
                    </button>
                </div>

                <div className="h-full max-sm:h-[400px] w-1/2 flex justify-center items-center max-sm:w-full">
                    <img src="/asserts/front-page-logos/Education-Course-Transparent-Background-PNG.png" alt="" width={440} />
                </div>
            </div>



            <div className='flex w-full justify-between items-center max-sm:mt-5 gap-2'>
                {
                    statistics.map((stat) => (
                        <div key={stat.label}>
                            <div className='text-4xl max-sm:text-lg font-extrabold font-palanquin dark:text-white'>{stat.value}</div>
                            <div className='text-m max-sm:text-sm text-slate-800 dark:text-slate-200'>{stat.label}</div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default MainSection;