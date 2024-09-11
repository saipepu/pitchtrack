import React from 'react'
import { EmitSocket } from '@/utils/socket/SocketEmit'
import { Pause, Play } from 'lucide-react'

const PlayButton = ({ slot, eventId, isRunning, setIsRunning, isActive, setIsLoading } : any ) => {

  const handlePlayButton = () => {
    setIsLoading && setIsLoading(true)
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

  return (
    <div
      className={
        `z-50 group cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] border-slate-300 px-1 md:px-2
        ${isRunning && isActive ? 'bg-slate-500' : isActive ? 'bg-green-500' : 'bg-transparent'}
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