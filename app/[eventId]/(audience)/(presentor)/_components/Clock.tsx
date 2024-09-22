import React from 'react'
import ProgressBar from './ProgressBar'
import CountDown from './CountDown'

const Clock = ({ isFlashing, countDown, slot, message }: any ) => {

  return (
    <>
      {/* COUNTDOWN */}
      <CountDown countDown={countDown} isFlashing={isFlashing} slot={slot} message={message} />

      {/* FOOTER WITH 3 BARS */}
      <ProgressBar slot={slot} countDown={countDown} />
    </>
  )
}

export default Clock