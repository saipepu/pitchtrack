"use client"
import { convertTotalSectoHHMMSS } from '@/utils/convertor/convert-totalsec-to-hhmmss'
import React, { useEffect, useState } from 'react'
import socket from '@/utils/socket';

interface ClockProps {
  isFlashing: boolean;
  slot: any;
}

// TO CALCULATE THE SAFE AND DANGER ZONE WIDTH
const TimerTrackerBar = (Timer: any) => {

  // safe zone(with) mean the time that the presentor can talk without any warning
  // CALCULATION (totalTime - warningTime) [before the warning time is safe time]
  const safeWidth = (Timer.time - Timer.warning) / Timer.time * 100

  // danger zone(with) mean the time that the presentor should make a conclusion
  // CALCULATION (dangerTime/totalTime * 100) [convert the danger time to percentage of the total time]
  const dangerWidth = Timer.danger / Timer.time * 100

  // warning zone(with) mean the time that the presentor should start to wrap up
  // CALCULATION (totalTime - warningTime - dangerTime) [before the danger time and after the safe time is warning time]
  const warningWidth = 100 - safeWidth - dangerWidth

  return { safeWidth, warningWidth, dangerWidth }
}

const Clock = ({ isFlashing, slot }: ClockProps ) => {

  const [countDown, setCountDown] = useState(0);
  const [progressBarColorWidth, setProgressBarColorWidth] = useState({ safeWidth: 0, warningWidth: 0, dangerWidth: 0 });
  const [currentPointer, setCurrentPointer] = useState(0);

  // SET THE COUNTDOWN TIMER CURSOR
  useEffect(() => {
    let cur = 100 - countDown / slot?.duration * 100;
    setCurrentPointer(cur);
  }, [countDown])

  useEffect(() => {
    setProgressBarColorWidth(
      TimerTrackerBar({
        time: parseInt(slot?.duration),
        warning: parseInt(slot?.warningTime),
        danger: parseInt(slot?.dangerTime)
      })
    )
  }, [slot])

  socket.on("timerUpdate", (message) => {
    setCountDown(message.remainingTime)
  })

  return (
    <>
      {/* Body */}
      <div id="box" className='relative w-full flex-1 flex flex-col justify-between items-center'
        style={{
          backgroundColor: countDown > slot?.warningTime - 1 ? 'white' : countDown > slot?.dangerTime - 1 ? 'yellow' : 'red',
          animation: isFlashing && countDown < slot?.dangerTime ? 'flash 0.5s infinite' : 'none'
        }}

      >
        <p className='text-2xl lg:text-4xl font-bold pt-8 text-center'>
          {slot?.generalMessage || 'No Message' }
        </p>
        <p className="text-[100px] lg:text-[400px] xl:text-[500px] font-bold text-center leading-[0px] tracking-tighter">
          {convertTotalSectoHHMMSS(countDown).substring(3, 8)}
        </p>
        <p className='text-3xl font-bold py-4 text-center'>
          {slot?.presentor}
        </p>
      </div>

      {/* Footer Width Animation */}
      <div className="relative w-full h-[5vh] flex justify-between items-center">
        <div className={`bg-green h-full`} style={{ width: `${progressBarColorWidth.safeWidth}%`}}>
        </div>
        <div className={`bg-yellow h-full`} style={{ width: `${progressBarColorWidth.warningWidth}%`}}>
        </div>
        <div className={`bg-red h-full`} style={{ width: `${progressBarColorWidth.dangerWidth}%`}}>
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