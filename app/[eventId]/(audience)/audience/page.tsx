"use client";

import { getEventById } from '@/app/_api/event';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast, useToast } from '@/components/ui/use-toast';
import { convertTotalSectoHHMMSS } from '@/utils/convertor/convert-totalsec-to-hhmmss';
import socket from '@/utils/socket';
import { LoaderCircle, MoreVerticalIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ShareableSlotList = () => {

  const { eventId } = useParams();
  const [event, setEvent] = useState<any>({});
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [socketSlotId, setSocketSlotId] = useState("");
  const [countdown, setCountdown] = useState(0);

  // FORMAT START TIME UTC TIME TO HH:MM:SS
  const formatStartTime = (time: string) => {
    let s = time ? new Date(time) : new Date()
    return new Date(s).getHours().toString().padStart(2, '0  ') + ':' + new Date(s).getMinutes().toString().padStart(2, '0') + ':' + new Date(s).getSeconds().toString().padStart(2, '0')
  }

  // FORMAT DURATION TOTAL SECONDS TO HH:MM:SS
  const formatDuration = (duration: number) => {
    const d = convertTotalSectoHHMMSS(duration).split(':').map((i: string) => i)
    return d[0] == '00' ? d.slice(1).join(':') : d.join(':')
  }

  const fetchEventById = async () => {

    console.log('FETCHING EVENT FROM SERVER . . .')

    const response = await getEventById({ eventId })

    if(response.success) {
      setEvent(response.message)
      let slotList = response.message.slots.map((slot: any, i: number) => {
        return {
          ...slot,
          tag: 'timeslot',
        }
      })
      setSlots(slotList)
      setMessage(response.message.messages.find((m: any) => m.onDisplay))
      localStorage.setItem('pitchtrack-event', JSON.stringify(response.message))
    } else {
      toast({
        title: "Failed to fetch event"
      })
      console.log('Failed to fetch event')
    }
    
  }

  useEffect(() => {

    fetchEventById()

  }, [])

  socket.on('onRoomInfoUpdate', (response) => {
    if(response.success) {
      console.log('response', response)
      let slotList = response.message.slots.map((slot: any, i: number) => {
        return {
          ...slot,
          tag: 'timeslot',
        }
      })
      setSlots(slotList)
      setMessage(response.message.messages.find((m: any) => m.onDisplay))
    }
  })

  socket.on("timerUpdate", (message) => {

    setIsLoading(false)
    // UPDATE THE GLOBAL RUNNING SLOT
    console.log(message)
    if(eventId == message.eventId) {
      setSocketSlotId(message.slotId)
      setCountdown(message.remainingTime)
    }

  })

  return (
    <div className='w-full h-full flex flex-col justify-start items-start overflow-y-scroll gap-2 p-2 pb-[100px]'>
      <div className='border-[1px] border-slate-300 rounded-md w-full min-h-[300px] overflow-hidden flex justify-center items-start'>
        <iframe
          src={`/${eventId || 'FALLBACK-EVENTID'}`}
          width="100%"
          height="300"
          style={{ border: 'none', maxWidth: "500px" }}
        />
      </div>
      {slots?.map((slot: any, i: number) => {
        return (
          <div key={i} className='w-full flex justify-start items-start'>
              <div
                className={`
                            relative group/slot w-full h-[80px] flex justify-between items-center rounded-lg p-2 gap-2
                            ${socketSlotId == slot._id ? 'border-2 border-green-700' : 'bg-slate-100'}
                            transition-all duration-300 overflow-visible
                          `}
              >
                {/* BACKGROUND PROGRESS */}
                <div className='absolute top-0 left-0 w-full h-full bg-transparent pointer-events-none select-none rounded-lg flex justify-start items-start overflow-hidden'>
                  {socketSlotId == slot._id && (
                    <div className='h-full bg-green-100 transition-all duration-1000 ease-linear' style={{ width: `${100 - (countdown/slot.duration * 100)}%` }}></div>
                  )}
                </div>
                {/* LINKING BAR */}
                {slot?.startTimeType == "linked" && slot?.sortOrder > 0 && <div className="z-30 absolute left-[4%] -top-6 w-2 h-8 bg-slate-500 rounded-lg ring-white ring-4"></div>}
                {isLoading && (
                  <div className="z-20 absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-[1px] border-2 border-slate-200 flex justify-center items-center rounded-lg">
                    <LoaderCircle size={32} className='animate-spin text-white/90' strokeWidth={5}/>
                  </div>
                )}
                <div className='w-full h-full flex justify-start items-center gap-1 md:gap-4 z-10'>

                  <div className='relative min-w-[16px] h-full flex justify-center items-center'>
                    <p className='absolute xl:group-hover/slot:opacity-0 text-lg font-semibold text-slate-500 duration-500 select-none'>{i+1}</p>
                  </div>
                  <div className='flex cursor-pointer max-w-[88px]h-full justify-center items-center gap-[2px] rounded-md px-2'>
                    <div className='w-full relative'>
                      <p className='xl:group-hover/slot:opacity-100 opacity-0 duration-500 text-xs text-slate-400 font-normal whitespace-nowrap select-none'>Start time</p>
                      <p className={`text-sm md:text-lg font-semibold whitespace-nowrap select-none ${slot?.startTimeType == "linked" && 'text-slate-300'}`}>{formatStartTime(slot.startTime)}</p>
                      <p className='xl:group-hover/slot:opacity-100 opacity-0 duration-500 text-xs text-slate-400 font-normal whitespace-nowrap select-none'>{slot?.startTimeType || "Start Type"}</p>
                    </div>
                  </div>
                  <div className='cursor-pointer max-w-[88px] h-full flex justify-center items-center gap-[2px] rounded-md px-2'>
                    <div className='w-full relative'>
                      <p className='xl:group-hover/slot:opacity-100 xl:opacity-0 duration-500 text-xs text-slate-400 font-normal whitespace-nowrap select-none'>Duration</p>
                      <p className='md:min-w-[65px] text-sm md:text-lg font-semibold whitespace-nowrap select-none'>{formatDuration(slot.duration)}</p>
                      <p className='xl:group-hover/slot:opacity-100 opacity-0 duration-500 text-xs text-slate-400 font-normal whitespace-nowrap select-none'>Countdown</p>
                    </div>
                  </div>
                  <div className='cursor-pointer w-full h-full flex justify-start items-center gap-[2px] rounded-md  px-2 ml-auto'>
                    <div className='w-full flex justify-start items-center gap-2 group'>
                      <Popover onOpenChange={(open) => {}}>
                        <PopoverTrigger asChild>
                          <p className='text-sm md:text-lg font-semibold whitespace-nowrap select-none truncate'>{slot?.title}</p>
                        </PopoverTrigger>
                        <PopoverContent className='w-fit max-w-[200px] bg-slate-100 text-black p-2 grid grid-cols-1 gap-1 pb-4'>
                          <p className="text-md font-medium">Actors</p>
                          <p className="text-sm font-light text-slate-500">{slot?.speaker}</p>
                          <p className="text-md font-medium">Notes</p>
                          <p className="text-sm font-light text-slate-500">{slot?.notes}</p>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                </div>
                
              </div>
          </div>
        )
      })}
    </div>
  )
}

export default ShareableSlotList