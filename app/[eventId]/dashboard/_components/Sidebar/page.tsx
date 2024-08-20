"use client";

import React from 'react'
import TimerPreview from './_components/TimerPreview';
import ConnectDevices from './_components/ConnectDevices';

const Sidebar = () => {

  return (
    <div className='w-full h-full p-2'
    >
      <TimerPreview />
      <ConnectDevices />
    </div>
  )
}

export default Sidebar