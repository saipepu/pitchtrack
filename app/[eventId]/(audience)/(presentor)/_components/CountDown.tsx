import { convertTotalSectoHHMMSS } from '@/utils/convertor/convert-totalsec-to-hhmmss'
import React from 'react'

const CountDown = ({ countDown, isFlashing, slot, message }: any) => {

  return (
    <div id="box" className='relative w-full flex-1 flex flex-col justify-between items-center transition-all duration-[2s]'
      style={{
        backgroundColor: countDown > slot?.warningTime - 1 ? 'white' : countDown > slot?.dangerTime - 1 ? 'yellow' :  countDown == 0 ? '#0e0e0e' : '#FF8888',
        animation: isFlashing && countDown < slot?.dangerTime ? 'flash 0.5s infinite' : 'none',
        transitionDuration: countDown == 0 ? '2s' : '1s'
      }}
    >
      <p className='text-2xl lg:text-4xl font-bold pt-8 text-center h-4'>
        {message?.desc || '' }
      </p>
      <p className="text-[100px] lg:text-[400px] xl:text-[500px] font-bold leading-tight text-center tracking-tighter">
        {convertTotalSectoHHMMSS(countDown).substring(3, 8)}
      </p>
      <p className='text-3xl font-bold py-4 text-center'>
        {slot?.presentor}
      </p>
    </div>
  )
}

export default CountDown