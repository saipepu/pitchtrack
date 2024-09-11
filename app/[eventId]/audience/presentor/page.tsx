"use client";

import React, { use, useEffect, useState } from 'react'
import Clock from './_components/Clock';
import socket from '@/utils/socket';
import { useParams } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { getEventById } from '@/app/_api/event';

const Presentor = () => {
  
  const { eventId } = useParams();
  const [isFlashing, setIsFlashing] = useState(false);
  const [slots, setSlots] = useState([]);
  const [event, setEvent] = useState<any>({});
  const [slot, setSlot] = useState<any>({})
  const [countDown, setCountDown] = useState(0);
  const [message, setMessage] = useState<any>();

  const fetchEventById = async () => {

    console.log('EVENT NOT FOUND IN LOCAL STORAGE, FETCHING FROM SERVER . . .')

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

  socket.on('slotsUpdated', (response) => {
    if(response.success) {
      let slotList = response.message.map((slot: any, i: number) => {
        return {
          ...slot,
          tag: 'timeslot',
        }
      })
      setSlots(slotList)
    }
  })

  socket.on("timerUpdate", (message) => {
    setCountDown(message.remainingTime)
    setSlot(slots.find((slot: any) => slot._id === message.slotId))
  })

  return (
    <div
      className='w-full h-full flex flex-col justify-start items-start overflow-hidden'
    >
      <div className='w-full h-full flex flex-col justify-start items-center'>
        {/* Header */}
        <div className="w-full flex justify-between items-center py-2 px-2 md:px-8 transition-all"
          style={{
            backgroundColor: countDown > slot?.warningTime - 1 ? 'white' : countDown > slot?.dangerTime - 1 ? 'yellow' :  countDown == 0 ? '#0e0e0e' : '#FF8888',
            animation: isFlashing && countDown < slot?.dangerTime ? 'flash 0.5s infinite' : 'none',
            transitionDuration: countDown == 0 ? '2s' : '1s'
          }}
        >
          <div className="w-full flex justify-start items-center">
            <p className="text-2xl md:text-4xl font-bold">PitchTrack</p>
          </div>
          <div className="w-full flex justify-center ite ms-center">
            <p className="text-2xl md:text-4xl font-bold">{slot?.speaker}</p>
          </div>
          <div
            className="hidden md:flex w-full justify-end items-center"
            >
            {/* <p className={`text-right ${isFlashing ? 'bg-red' : 'bg-white'} text-black px-4 py-2 rounded-lg cursor-pointer`}
              onClick={() => setIsFlashing(!isFlashing)}
            >
              Flash
            </p> */}
              <p className="text-2xl md:text-4xl font-bold">{event.title}</p>
          </div>
        </div>

        {/* <Clock isFlashing={isFlashing} slot={slot} countDown={countDown} /> */}
        {slot ? (
          <Clock isFlashing={isFlashing} slot={slot} countDown={countDown}/>
        ): (
          <div className='w-full h-full flex justify-center items-center'>
            <p className='text-lg font-bold'>Slot unselected or delected</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default Presentor