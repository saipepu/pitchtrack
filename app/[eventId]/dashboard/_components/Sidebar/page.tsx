"use client";

import React from 'react'
import TimerPreview from './_components/TimerPreview';
import ConnectDevices from './_components/ConnectDevices';

type SidebarProps = {
  eventId: string
}

const Sidebar = ({ eventId } : SidebarProps ) => {

  return (
    <div className='w-full h-full p-2'
    >
      <TimerPreview eventId={eventId} />
      <ConnectDevices />
    </div>
  )
}

export default Sidebar