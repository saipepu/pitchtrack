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
  const [slot, setSlot] = useState<any>(undefined);

  const fetchEventById = async () => {

    let e: any = localStorage.getItem('pitchtrack-event')
    
    if(e?._id === eventId) {
      setEvent(JSON.parse(e))
      setSlots(JSON.parse(e).slots)
      return
    }

    console.log('fetching event')

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

  }, [eventId])

  useEffect(() => {
    if(eventId) {
      socket.emit('joinRoom', { eventId })
    }
  }, [])

  useEffect(() => {

    // SET THE CURRENT SLOT WHICH IS ACTIVE OR PAUSED
    // IF NO ACTIVE OR PAUSED SLOT, SET THE FIRST SLOT
    if(slots.length > 0) {
      let currentSlot = slots.find((slot: any) => {
        return slot.status === 'active' || slot.status === 'paused'
      })
      if(!currentSlot) {
        setSlot(slots[0])
      } else {
        setSlot(currentSlot)
      }
    }

  }, [slots])

  socket.on('slotsUpdated', (response) => {
    console.log('Slots updated', response)
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
            <p className="text-2xl md:text-4xl font-bold">{slot?.speaker}</p>
          </div>
          <div
            className="hidden md:flex w-full justify-end items-center"
            >
            <p className={`text-right ${isFlashing ? 'bg-red' : 'bg-white'} text-black px-4 py-2 rounded-lg cursor-pointer`}
              onClick={() => setIsFlashing(!isFlashing)}
            >
              Flash
            </p>
          </div>
        </div>

        {slot ? (
          <Clock isFlashing={isFlashing} slot={slot} />
        ): (
          <div className='w-full h-full flex justify-center items-center'>
            <p className='text-2xl font-bold'>No Slot Available</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default Presentor