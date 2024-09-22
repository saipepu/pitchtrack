"use client";

import React, { useEffect, useState } from 'react'

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

const ProgressBar = ({ slot, countDown }: any) => {

  const [progressBarColorWidth, setProgressBarColorWidth] = useState({ safeWidth: 0, warningWidth: 0, dangerWidth: 0 });
  const [currentPointer, setCurrentPointer] = useState(0);

  useEffect(() => {
    setProgressBarColorWidth(
      TimerTrackerBar({
        time: parseInt(slot?.duration),
        warning: parseInt(slot?.warningTime),
        danger: parseInt(slot?.dangerTime)
      })
    )
  }, [slot])

  // SET THE COUNTDOWN TIMER CURSOR
  useEffect(() => {
    let cur = 100 - countDown / slot?.duration * 100;
    setCurrentPointer(cur);
  }, [countDown])

  return (
    <div className="relative w-full h-[5vh] flex justify-between items-center">
      <div className={`bg-green h-full`} style={{ width: `${progressBarColorWidth.safeWidth}%`}}>
      </div>
      <div className={`bg-yellow h-full`} style={{ width: `${progressBarColorWidth.warningWidth}%`}}>
      </div>
      <div className={`bg-red h-full`} style={{ width: `${progressBarColorWidth.dangerWidth}%`}}>
      </div>
      <div
        className={`absolute w-[5px] h-full bg-black transition-left ease-linear ${currentPointer == 0 ? 'duration-0' : 'duration-1000'}`}
        style={{ left: `${currentPointer}%` }}
      >
      </div>
    </div>
  )
}

export default ProgressBar