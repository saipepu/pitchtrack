import React from 'react'
import ProgressBar from './ProgressBar'
import CountDown from './CountDown'

const Clock = ({ isFlashing, countDown, duration, warningTime, dangerTime, presentor, message }: any ) => {

  return (
    <>
      {/* COUNTDOWN */}
      <CountDown countDown={countDown} isFlashing={isFlashing} warningTime={warningTime} dangerTime={dangerTime} presentor={presentor} message={message} />

      {/* FOOTER WITH 3 BARS */}
      <ProgressBar duration={duration} warningTime={warningTime} dangerTime={dangerTime} countDown={countDown} />
    </>
  )
}

export default Clock