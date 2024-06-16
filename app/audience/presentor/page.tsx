"use client";

import React, { use, useEffect, useState } from 'react'
import Clock from './_components/Clock';
import { Timer } from '@/server/presentor/getTimer';

const Presentor = () => {
  
  const [isFlashing, setIsFlashing] = useState(false);

  return (
    <div
      className='w-full h-full flex flex-col justify-start items-start overflow-hidden'
    >
      <div className='w-full h-full flex flex-col justify-start items-center'>
        {/* Header */}
        <div className="w-full flex justify-between items-center py-2 px-2 md:px-8">
          <div className="w-full flex justify-start items-center">
            <p className="text-2xl md:text-4xl font-bold">PitchTrack</p>
          </div>
          <div className="w-full flex justify-center ite ms-center">
            <p className="text-2xl md:text-4xl font-bold">{Timer.team}</p>
          </div>
          <div
            className="hidden md:flex w-full flex justify-end items-center"
            >
            <p className={`text-right ${isFlashing ? 'bg-red' : 'bg-white'} text-black px-4 py-2 rounded-lg cursor-pointer`}
              onClick={() => setIsFlashing(!isFlashing)}
            >
              Flash
            </p>
          </div>
        </div>

        <Clock isFlashing={isFlashing} />

      </div>
    </div>
  )
}

export default Presentor