"use client";

import { ChevronDown, ChevronUp, RefreshCcw } from 'lucide-react'
import React, { useState } from 'react'
import socket from '@/utils/socket';

const ConnectDevices = () => {

  const [devices, setDevices] = useState<any>([])
  const [showDevices, setShowDevices] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState(false)

  socket.on('connectedDevices', (response) => {
    setDevices(response)
  })

  // show the connected devices from ws
  return (
    <div className='hidden w-full md:flex flex-col justify-start items-start gap-1 pb-[100px]'>
      <div className='w-full flex justify-between items-center'>
        <h2 className='text-md font-medium'>Connected Devices</h2>
        <div className='flex justify-center items-center gap-1'>
          <div id="refresher" className='p-1 flex justify-center items-center hover:bg-slate-100 rounded-md cursor-pointer' onClick={() => {
            document.getElementById('refresher')?.classList.add('animate-spin-once')
            setIsLoading(true)
            setTimeout(() => {
              document.getElementById('refresher')?.classList.remove('animate-spin-once')
              setIsLoading(false)
            }, 500)
          }}>
            <RefreshCcw size={16} />
          </div>
          <div className='p-1 flex justify-center items-center hover:bg-slate-100 rounded-md cursor-pointer' onClick={() => setShowDevices(!showDevices)}>
            {showDevices ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </div>
      {isLoading && (
        <div className='w-full flex justify-center items-center'>
          <p className='text-sm font-light'>Loading...</p>
        </div>
      )}
      {!isLoading && showDevices && (
        <div className='w-full flex flex-col gap-1'>
          {devices.map((device: any, i: number) => (
            <div key={i} className='w-full flex justify-between items-center px-2 py-1 bg-slate-100 rounded-md'>
              <span className='text-xs font-light'>{i+1 + ". " +device}</span>
              <span className={`text-sm text-white px-2 py-1 rounded-md bg-emerald-400`}>Connected</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ConnectDevices