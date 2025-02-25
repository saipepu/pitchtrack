"use client";

import React, { useEffect, useState } from 'react'

// TO CALCULATE THE SAFE AND DANGER ZONE WIDTH
const TimerTrackerBar = (Timer: any) => {
  
  if (Timer.warning > Timer.time) {
    Timer.warning = Timer.time * 0.5
    Timer.danger = Timer.time * 0.25
  }
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

const ProgressBar = ({ duration, warningTime, dangerTime, countDown }: any) => {

  const [progressBarColorWidth, setProgressBarColorWidth] = useState({ safeWidth: 0, warningWidth: 0, dangerWidth: 0 });
  const [currentPointer, setCurrentPointer] = useState(0);

  useEffect(() => {
    setProgressBarColorWidth(
      TimerTrackerBar({
        time: duration,
        warning: warningTime,
        danger: dangerTime
      })
    )
  }, [duration, warningTime, dangerTime])

  // SET THE COUNTDOWN TIMER CURSOR
  useEffect(() => {
    let cur = 100 - countDown / duration * 100;
    setCurrentPointer(cur);

    console.log('COUNTDOWN', countDown, 'Danger Time', dangerTime)

    if(countDown == 1) {
      // PLAY AUDIO
      console.log('PLAY AUDIO')
      playAudio()
    }

  }, [countDown])

  // PLAY AUDIO
  const playAudio = () => {
    let audio: any = document.getElementById('alarm')
    audio.muted = false
    if(audio) {
      audio.playbackRate = 3
      audio.play()
    }
  }

  return (
    <div className="relative w-full h-[5vh] flex justify-between items-center">
      <audio
          id="alarm"
          controls
          muted={true}
          src="/alarm.mp3" className='opacity-0 h-0 z-0 pointer-events-none absolute'>
              Your browser does not support the
              <code>audio</code>
      </audio>
      <div className={`bg-emerald-400 h-full`} style={{ width: `${progressBarColorWidth.safeWidth}%`}}>
      </div>
      <div className={`bg-amber-400 h-full`} style={{ width: `${progressBarColorWidth.warningWidth}%`}}>
      </div>
      <div className={`bg-red-400 h-full`} style={{ width: `${progressBarColorWidth.dangerWidth}%`}}>
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