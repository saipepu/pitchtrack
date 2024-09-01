import React from 'react'
import { EmitSocket } from '@/utils/socket/SocketEmit'
import { Pause, Play } from 'lucide-react'

const PlayButton = ({ slot, eventId } : any ) => {

  const handlePlayButton = () => {
    switch(slot?.status) {
      case 'active':
        EmitSocket('pause', {
          duration: slot.duration,
          eventId: eventId,
          slotId: slot._id
        })
        break
      case 'paused':
        EmitSocket('resume', {
          duration: slot.duration,
          eventId: eventId,
          slotId: slot._id
        })
        break
      default:
        EmitSocket('start', {
          duration: slot.duration,
          eventId: eventId,
          slotId: slot._id
        })
    }
  }
  return (
    <div
      className={`group cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] border-slate-300 px-1 md:px-2 ${slot?.status == 'active' ? 'bg-red-300' : 'bg-slate-100 lg:hover:bg-green-400'} transition-all duration-300`}
      onClick={() => handlePlayButton()}
    >
      {slot?.status == 'active' ? <Pause size={16} fill={"white"} stroke={"white"} /> : <Play size={16} fill="black" strokeWidth="0" className='lg:group-hover:fill-white lg:group-hover:stroke-white' /> }
    </div>
  )
}

export default PlayButton