"use client";

import { ChevronDown, ChevronUp, RefreshCcw } from 'lucide-react'
import React, { useState } from 'react'

const ConnectDevices = () => {

  const [showDevices, setShowDevices] = useState<boolean>(true)

  let devices = [
    {
      id: 1,
      name: 'Device 1',
      status: 'connected'
    },
    {
      id: 2,
      name: 'Device 2',
      status: 'disconnected'
    }
  ]

  // show the connected devices from ws
  return (
    <div className='hidden w-full md:flex flex-col justify-start items-start gap-1'>
      <div className='w-full flex justify-between items-center'>
        <h2 className='text-md font-medium'>Connected Devices</h2>
        <div className='flex justify-center items-center gap-1'>
          <div className='p-1 flex justify-center items-center hover:bg-slate-100 rounded-md cursor-pointer'>
            <RefreshCcw size={16} />
          </div>
          <div className='p-1 flex justify-center items-center hover:bg-slate-100 rounded-md cursor-pointer' onClick={() => setShowDevices(!showDevices)}>
            {showDevices ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </div>
      {showDevices && (
        <div className='w-full flex flex-col gap-1'>
          {devices.map(device => (
            <div key={device.id} className='w-full flex justify-between items-center px-2 py-1 bg-slate-100 rounded-md'>
              <span className='text-sm font-bold'>{device.name}</span>
              <span className={`text-sm text-white px-2 py-1 rounded-md ${device.status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}>{device.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ConnectDevices