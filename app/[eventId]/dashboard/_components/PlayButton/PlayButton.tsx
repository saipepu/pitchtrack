"use client";

import React, { useState } from 'react'
import { EmitSocket } from '@/utils/socket/SocketEmit'
import { Pause, Play } from 'lucide-react'
import socket from '@/utils/socket'

const PlayButton = ({ slot, eventId, isRunning, setIsRunning, isActive, setIsLoading } : any ) => {

  const [isCompleted, setIsCompleted] = useState(false)

  const handlePlayButton = () => {
    setIsLoading && setIsLoading(true)

    if(isCompleted) {
      setIsCompleted(false)
      EmitSocket('start', {
        duration: slot.duration,
        eventId: eventId,
        slotId: slot._id
      })
      setIsRunning(true)

    } else {

      if(isActive && isRunning) {
        EmitSocket('pause', {
          duration: slot.duration,
          eventId: eventId,
          slotId: slot._id
        })
        setIsRunning(false)
      } else if(isActive) {
        EmitSocket('resume', {
          duration: slot.duration,
          eventId: eventId,
          slotId: slot._id
        })
        setIsRunning(true)
      } else {
        EmitSocket('start', {
          duration: slot.duration,
          eventId: eventId,
          slotId: slot._id
        })
        setIsRunning(true)
      }

    }
  }

  socket.on('timerCompleted', () => {
    setIsRunning(false)
    setIsCompleted(true)
  })

  return (
    <div
      className={
        `z-30 group cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md border-slate-300 px-1 md:px-2
        ${isRunning && isActive ? 'bg-red-200 border-0' : isActive ? 'bg-green-500 border-0' : 'bg-transparent border-[1px]'}
        transition-all duration-300`
      }
      onClick={() => handlePlayButton()}
    >
      {isRunning && isActive ? (
        <Pause size={16} fill={"white"} stroke={"white"} />
      ) : (
        <Play size={16} fill={isActive ? "white" : "black"} strokeWidth="0" className='lg:group-hover:stroke-white' />
      )}
    </div>
  )
}

export default PlayButton