"use client";

import React, { use, useEffect, useState } from 'react'
import Clock from './_components/Clock';
import socket from '@/utils/socket';
import { useParams } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { getEventById } from '@/app/_api/event';
import Header from './_components/Header';

const Presentor = () => {
  
  const { eventId } = useParams();
  const [isFlashing, setIsFlashing] = useState(false);
  const [slots, setSlots] = useState([]);
  const [event, setEvent] = useState<any>({});
  const [slot, setSlot] = useState<any>({})
  const [countDown, setCountDown] = useState(0);
  const [message, setMessage] = useState<any>();

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
      setSlot(slotList[0])
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
      setSlot(slotList.find((s: any) => s._id === response.runningSlotId || slotList[0]._id))
      setMessage(response.message.messages.find((m: any) => m.onDisplay))
    }
  })

  socket.on("timerUpdate", (message) => {
    setCountDown(message.remainingTime)
    setSlot(slots.find((slot: any) => slot._id === message.slotId))
  })

  return (
    <div className='w-full h-full flex flex-col justify-start items-start overflow-hidden'> {/* WRAPPER */}
      <div className='w-full h-full flex flex-col justify-start items-center'> {/* CONTAINER */}
        
        <Header countDown={countDown} slot={slot} isFlashing={isFlashing} event={event} />

        <div className='w-full h-full flex flex-col justify-center items-center'>
          {slot ? (
            <Clock isFlashing={isFlashing} slot={slot} countDown={countDown} message={message} />
          ): (
            <p className='text-lg font-bold'>Slot unselected or delected</p>
          )}
        </div>

      </div>
    </div>
  )
}

export default Presentor