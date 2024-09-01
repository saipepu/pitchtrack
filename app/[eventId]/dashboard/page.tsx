"use client"

import React, { useEffect, useState } from 'react'
import Sidebar from './_components/Sidebar/page'
import TimerPreset from './_components/TimerPreset/page'
import MessageList from './_components/MessageList/page'
import { SlotContext } from '../../hooks/SlotContext'
import Header from './_components/Header/Header'
import { useParams } from 'next/navigation'
import { getEventById, getAllEvents } from '@/app/_api/event'
import { useToast } from '@/components/ui/use-toast'
import socket from '@/utils/socket'

const page = () => {

  const { toast } = useToast()
  const { eventId }: { eventId: string } = useParams();
  const [event, setEvent] = useState<any>({})
  const [events, setEvents] = useState([])
  const [slots, setSlots] = useState([])
  const [messages, setMessages] = useState([])

  // FETCH EVENT
  const fetchEventById = async () => {

    let e: any = localStorage.getItem('pitchtrack-event')
    
    if(e?._id === eventId) {
      setEvent(JSON.parse(e))
      setSlots(JSON.parse(e).slots)
      setMessages(JSON.parse(e).messages)
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
      let messageList = response.message.messages.map((message: any, i: number) => {
        return {
          ...message,
          tag: 'message',
        }
      })
      setMessages(messageList)
      localStorage.setItem('pitchtrack-event', JSON.stringify(response.message))
    } else {
      toast({
        title: "Failed to fetch event"
      })
      console.log('Failed to fetch event')
    }

  }

  // FETCH ALL EVENTS
  const fetchAllEvents = async () => {

    const response = await getAllEvents()

    if(response.success) {
      setEvents(response.message)
    } else {
      toast({
        title: "Failed to fetch events"
      })
      console.log('Failed to fetch events')
    }

  }
  
  useEffect(() => {

    fetchEventById()
    fetchAllEvents()

    socket.emit('joinRoom', { eventId: eventId })

  }, [eventId])

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

  return (
    <SlotContext.Provider value={{slots, setSlots, messages, setMessages, event }}>
      <div className='w-full h-full flex flex-col justify-start items-start overflow-y-scroll lg:overflow-y-hidden'>

        {/* Header */}
        <Header event={event} events={events} fetchAllEvents={fetchAllEvents}/>

        <div className='w-full h-full lg:max-h-full bg-white flex flex-col lg:flex-row justify-start items-start gap-5 lg:gap-0 lg:overflow-y-hidden'>

          {/* Sidebar */}
          <div className='flex lg:flex-2 lg:w-[35vw] lg:min-w-[300px] w-full lg:h-full lg:overflow-y-scroll'>
            <Sidebar />
          </div>

          {/* Timer Preset */}
          <div className='lg:flex-4 w-full lg:h-full'>
            <TimerPreset />
          </div>

          {/* Message List */}
          <div className='lg:flex lg:flex-2 w-full lg:h-full lg:max-w-[25vw]'>
            <MessageList />
          </div>

        </div>

      </div>
    </SlotContext.Provider>
  )
}

export default page