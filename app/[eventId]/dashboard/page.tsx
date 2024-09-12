"use client"

import React, { useEffect, useState } from 'react'
import Sidebar from './_components/Sidebar/page'
import TimerPreset from './_components/TimerPreset/page'
import MessageList from './_components/MessageList/page'
import { SlotContext } from '../../hooks/SlotContext'
import Header from './_components/Header/Header'
import { useParams } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import socket from '@/utils/socket'
import { getOrgById } from '@/app/_api/org'
import { useRouter } from 'next/navigation'
import { Loader, LoaderCircle } from 'lucide-react'
import { ToastAction } from '@/components/ui/toast'

const page = () => {

  const { toast } = useToast()
  const router = useRouter()
  const { eventId }: { eventId: string } = useParams();
  const [organizer, setOrganizer] = useState({})
  const [event, setEvent] = useState<any>({})
  const [events, setEvents] = useState([])
  const [slots, setSlots] = useState([])
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [runningSlot, setRunningSlot] = useState('')

  // PLAY AUDIO
  const playAudio = () => {
    let audio: any = document.getElementById('alarm')
    if(audio) {
      audio.play()
    }
  }

  // FETCH ORGANIZER DATA
  const fetchOrganizerData = async () => {

    // JWT DECODER

    let token = localStorage.getItem('pitchtrack-token') || ""
    const parseJwt = (token: any) => {
      if (!token) { return; }
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }
    const { sub } = parseJwt(token)

    const response = await getOrgById({ id: sub })
    if(response.success) {

      localStorage.setItem('pitchtrack-organizer', JSON.stringify(response.message))

      setOrganizer(response.message)
      setEvents(response.message.events)

      if(eventId == 'loading') {

        // FIRST TIME LOGIN WILL REDIRECT TO THE LOADING STAGE
        // IF THE EVENT ID IS 'loading', SET THE FIRST EVENT AS THE DEFAULT EVENT
        setEvent(response.message.events[0])
        setSlots(response.message.events[0].slots.map((slot: any, i: number) => {
          return {
            ...slot,
            tag: 'timeslot',
          }
        }))
        setMessages(response.message.events[0].messages.map((message: any, i: number) => {
          return {
            ...message,
            tag: 'message',
          }
        }))
        router.push(`/${response.message.events[0]._id}/dashboard`)

      } else {

        let selectedEvent = response.message.events.find((event: any) => event._id == eventId)
        setEvent(selectedEvent)
        let s = selectedEvent.slots.map((slot: any, i: number) => {
          return {
            ...slot,
            tag: 'timeslot',
          }
        })
        s = s.sort((a: any, b: any) => a.sortOrder - b.sortOrder)
        setSlots(s)
        setMessages(selectedEvent.messages.map((message: any, i: number) => {
          return {
            ...message,
            tag: 'message',
          }
        }))

      }

    } else {
      toast({
        title: "Session Expired"
      })
      console.log('Failed to fetch organizer data')
      if(response.message == 'Unauthorized') {
        router.push('/landing')
      }
    }

  }
  
  useEffect(() => {

    // LOADING STAGE
    setIsLoading(true)
    fetchOrganizerData()
    setIsLoading(false)

  }, [eventId])

  socket.on('onRoomInfoUpdate', (response) => {
    if(response.success) {
      console.log('ws:onRoomInfoUpdate', response)
      setEvent(response.message)
      let s = response.message.slots.map((slot: any, i: number) => {
        return {
          ...slot,
          tag: 'timeslot',
        }
      })
      s = s.sort((a: any, b: any) => a.sortOrder - b.sortOrder)
      setSlots(s)
      setMessages(response.message.messages.map((message: any, i: number) => {
        return {
          ...message,
          tag: 'message',
        }
      }))
      toast({
        title: `Syncing ${response.category}` || "Sync Info",
        action: <ToastAction altText="Undo" onClick={() => console.log('Undo')} className="border-none">
                  <LoaderCircle size={32} className='animate-spin text-black/40' strokeWidth={5}/>
                </ToastAction>
      })
      setTimeout(() => {
        toast({}).dismiss()
      }, 1000)
    }
  })

  if (isLoading) return (
    <div className='w-full h-full flex justify-center items-center'>
      <p>Loading...</p>
    </div>
  )

  return (
    <SlotContext.Provider value={{slots, setSlots, messages, setMessages, event, isRunning, setIsRunning, isActive, setIsActive, runningSlot, setRunningSlot }}>
      <div className='w-full h-full flex flex-col justify-start items-start overflow-y-scroll lg:overflow-y-hidden'>
        {/* <audio
            id="alarm"
            controls
            src="/alarm.mp3" className='opacity-0 h-0 z-0 pointer-events-none'>
                Your browser does not support the
                <code>audio</code>
        </audio> */}

        {/* Header */}
        <Header organizer={organizer} event={event} events={events} setEvents={setEvents} fetchOrganizerData={fetchOrganizerData}/>

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