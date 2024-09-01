"use client"
import { socketApi } from '@/app/_api/api';
import { convertHHMMSStoTotalSec } from '@/utils/convertor/convert-hhmmss-to-totalsec';
import { convertTotalSectoHHMMSS } from '@/utils/convertor/convert-totalsec-to-hhmmss'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

console.log('socketApi', socketApi)
const socket = io(socketApi,{
  transports: ['websocket'],
});
socket.on('connect', () => {
  console.log('Connected')
})

interface ClockProps {
  isFlashing: boolean;
}

// Dummay Timer Data
const Timer = {
  team: "Test Team",
  presentor: "Test Presentor",
  time: "00:00:10",
  warning: "00:00:05",
  danger: "00:00:02",
  generalMessage: "Test General Message"
}

// TO CALCULATE THE SAFE AND DANGER ZONE WIDTH
const TimerTrackerBar = (Timer: any) => {
    // safe zone(with) mean the time that the presentor can talk without any warning
  // CALCULATION (totalTime - warningTime) [before the warning time is safe time]
  const safeWidth = Math.floor((convertHHMMSStoTotalSec(Timer.time) - convertHHMMSStoTotalSec(Timer.warning)) / convertHHMMSStoTotalSec(Timer.time) * 100)

  // danger zone(with) mean the time that the presentor should make a conclusion
  // CALCULATION (dangerTime/totalTime * 100) [convert the danger time to percentage of the total time]
  const dangerWidth = Math.floor(convertHHMMSStoTotalSec(Timer.danger) / convertHHMMSStoTotalSec(Timer.time) * 100)

  // warning zone(with) mean the time that the presentor should start to wrap up
  // CALCULATION (totalTime - warningTime - dangerTime) [before the danger time and after the safe time is warning time]
  const warningWidth = Math.floor(100 - safeWidth - dangerWidth)

  return { safeWidth, warningWidth, dangerWidth }
}

const Clock = ({ isFlashing }: ClockProps ) => {

  const { eventId } = useParams();
  const [isMounted, setIsMoutned] = useState(false);
  const [countDown, setCountDown] = useState(convertHHMMSStoTotalSec(Timer.time));
  const { safeWidth, warningWidth, dangerWidth } = TimerTrackerBar(Timer);

  const [currentPointer, setCurrentPointer] = useState(0);

  // Count down the time
  useEffect(() => {
    setIsMoutned(true);
  },[])

  useEffect(() => {
    socket.emit("joinRoom", { eventId: eventId })
  },[eventId])

  // Calculate the current pointer position
  useEffect(() => {
    let cur = 100 - countDown / convertHHMMSStoTotalSec(Timer.time) * 100;
    setCurrentPointer(cur);
  }, [countDown])

  if (!isMounted) {
    return null; // Avoid rendering mismatched content on the server
  }

  socket.on("timerUpdate", (message) => {
    console.log("Timer Update", message)
    setCountDown(message.remainingTime)
  })

  return (
    <>
      {/* Body */}
      <div id="box" className='relative w-full flex-1 flex flex-col justify-between items-center'
        style={{
          backgroundColor: countDown > convertHHMMSStoTotalSec(Timer.warning) - 1 ? 'white' : countDown > convertHHMMSStoTotalSec(Timer.danger) - 1 ? 'yellow' : 'red',
          animation: isFlashing && countDown < convertHHMMSStoTotalSec(Timer.danger) ? 'flash 0.5s infinite' : 'none'
        }}

      >
        <p className='text-2xl lg:text-4xl font-bold pt-8 text-center'>
          {Timer.generalMessage}
        </p>
        <p className="text-[100px] lg:text-[400px] xl:text-[500px] font-bold text-center leading-[0px] tracking-tighter">
          {convertTotalSectoHHMMSS(countDown).substring(3, 8)}
        </p>
        <p className='text-3xl font-bold py-4 text-center'>
          {Timer.presentor}
        </p>
      </div>

      {/* Footer Width Animation */}
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