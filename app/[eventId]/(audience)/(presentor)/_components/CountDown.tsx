"use client";

import { convertTotalSectoHHMMSS } from '@/utils/convertor/convert-totalsec-to-hhmmss'
import React from 'react'

const CountDown = ({ countDown, isFlashing, warningTime, dangerTime, presentor, message }: any) => {

  return (
    <div id="box" className='relative w-full flex-1 flex flex-col justify-between items-center transition-all duration-[2s]'
      style={{
        backgroundColor: countDown > warningTime ? 'white' : countDown > dangerTime ? 'yellow' :  countDown == 0 ? '#0e0e0e' : '#FF8888',
        animation: isFlashing && countDown < dangerTime ? 'flash 0.5s infinite' : 'none',
        transitionDuration: countDown == 0 ? '2s' : '1s'
      }}
    >
      <p className='text-sm font-normal lg:text-4xl lg:font-bold pt-8 text-center h-4 whitespace-pre-wrap'>
        {message?.desc || '' }
      </p>
        {countDown > 3600 ? 
          <p className="text-[50px] lg:text-[200px] xl:text-[300px] font-bold leading-tight text-center tracking-tighter">
            {convertTotalSectoHHMMSS(countDown).substring(0, 8)}
          </p>
         :
          <p className="text-[100px] lg:text-[400px] xl:text-[500px] font-bold leading-tight text-center tracking-tighter">
            {convertTotalSectoHHMMSS(countDown).substring(3, 8)}
          </p>
        }
      <p className='text-3xl font-bold py-4 text-center'>
        {presentor}
      </p>
    </div>
  )
}

export default CountDown