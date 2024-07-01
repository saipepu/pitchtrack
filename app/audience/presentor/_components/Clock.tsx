"use client"
import { Timer } from '@/server/presentor/getTimer';
import { convertHHMMSStoTotalSec } from '@/utils/convertor/convert-hhmmss-to-totalsec';
import { convertTotalSectoHHMMSS } from '@/utils/convertor/convert-totalsec-to-hhmmss'
import React, { useEffect, useState } from 'react'

interface ClockProps {
  isFlashing: boolean;
}

const Clock = ({ isFlashing }: ClockProps ) => {

  const [isMounted, setIsMoutned] = useState(false);
  const [countDown, setCountDown] = useState(convertHHMMSStoTotalSec(Timer.time));

  // safe zone(with) mean the time that the presentor can talk without any warning
  // CALCULATION (totalTime - warningTime) [before the warning time is safe time]
  const safeWidth = Math.floor((convertHHMMSStoTotalSec(Timer.time) - convertHHMMSStoTotalSec(Timer.warning)) / convertHHMMSStoTotalSec(Timer.time) * 100)

  // danger zone(with) mean the time that the presentor should make a conclusion
  // CALCULATION (dangerTime/totalTime * 100) [convert the danger time to percentage of the total time]
  const dangerWidth = Math.floor(convertHHMMSStoTotalSec(Timer.danger) / convertHHMMSStoTotalSec(Timer.time) * 100)

  // warning zone(with) mean the time that the presentor should start to wrap up
  // CALCULATION (totalTime - warningTime - dangerTime) [before the danger time and after the safe time is warning time]
  const warningWidth = Math.floor(100 - safeWidth - dangerWidth)
  const [currentPointer, setCurrentPointer] = useState(0);

  // Count down the time
  useEffect(() => {
    setIsMoutned(true);
    const interval = setInterval(() => {
      setCountDown((prevCountDown: number) => {
        if (prevCountDown > 0) {
          return prevCountDown - 1;
        } else {
          return convertHHMMSStoTotalSec(Timer.time);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  },[])

  // Calculate the current pointer position
  useEffect(() => {
    let cur = 100 - countDown / convertHHMMSStoTotalSec(Timer.time) * 100;
    setCurrentPointer(cur);
  }, [countDown])

  if (!isMounted) {
    return null; // Avoid rendering mismatched content on the server
  }

  return (
    <>
      {/* Body */}
      <div id="box" className='relative w-full flex-1 flex flex-col justify-between items-center'
        style={{
          backgroundColor: countDown > convertHHMMSStoTotalSec(Timer.warning) - 1 ? 'white' : countDown > convertHHMMSStoTotalSec(Timer.danger) - 1 ? 'yellow' : 'red',
          animation: isFlashing && countDown < convertHHMMSStoTotalSec(Timer.danger) ? 'flash 0.5s infinite' : 'none'
        }}

      >
        <p className='text-2xl md:text-4xl font-bold pt-8 text-center'>
          {Timer.generalMessage}
        </p>
        <p className="text-[120px] md:text-[240px] lg:text-[500px] font-bold text-center leading-[0px]">
          {convertTotalSectoHHMMSS(countDown).substring(3, 8)}
        </p>
        <p className='text-3xl font-bold py-4 text-center'>
          {Timer.presentor}
        </p>
      </div>

      {/* Footer */}
      <div className="relative w-full h-[5vh] flex justify-between items-center">
        <div className={`bg-green h-full`} style={{ width: `${safeWidth}%`}}>
        </div>
        <div className={`bg-yellow h-full`} style={{ width: `${warningWidth}%`}}>
        </div>
        <div className={`bg-red h-full`} style={{ width: `${dangerWidth}%`}}>
        </div>
        <div className="absolute w-[5px] h-full bg-black duration-1000 transition-all ease-linear"
          style={{ left: `${currentPointer}%` }}
        >
        </div>
      </div>
    </>
  )
}

export default Clock