"use client";

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'next/navigation';
import { updateEventById } from '@/app/_api/event';
import ProfileDropDownButton from '@/components/profile/ProfileDropDownButton';
import { PencilLine } from 'lucide-react';

const Header = ({ organizer, event, events, fetchOrganizerData }: any) => {

  const { eventId } = useParams()
  const [isEventNameChanging, setIsEventNameChanging] = useState(false)
  const [eventName, setEventName] = useState(event?.title || 'Unnamed')
  const { toast } = useToast()

  // UPDATE EVENT
  const updateEvent = async ({ eventName }: any) => {
      
    let dto = {
      title: eventName,
    }

    if(eventName === '') {
      toast({
        title: "Event name cannot be empty",
      })
      return
    }

    const newEvent = await updateEventById({ event: dto, eventId })

    if(newEvent.success) {

      toast({
        title: "Event updated Successful",
      })
      fetchOrganizerData()

    } else {
      
      toast({
        title: "Event update failed",
      })

    }
  
  }

  useEffect(() => {

    setEventName(event?.title)

  }, [event])

  return (
    <div className='w-full flex justify-center items-center border-b-[1px] border-slate-100 p-2'>

      <div className='w-full h-10 flex justify-start items-center'>
        {isEventNameChanging ? (
          <>
            <Input
              id="eventName"
              name="eventName"
              autoFocus={true}
              placeholder='Unnamed'
              value={eventName}
              onChange={(e) => {
                  setEventName(e.target.value)
                }
              }
              onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsEventNameChanging(false)
                    updateEvent({ eventName: eventName })
                  }
                }
              }
              onBlur={() => {
                setIsEventNameChanging(false)
                updateEvent({ eventName: eventName })
              }}
              className='text-base md:text-2xl max-w-full w-fit bg-transparent font-bold focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:border-0 placeholder:text-slate-400'
            />
            <PencilLine size={18}/>
          </>
        ): 
        (
          <>
            <div
              className='text-base md:text-2xl max-w-full w-fit bg-transparent font-bold px-3 py-2'
              onClick={() => setIsEventNameChanging(true)}
            >
              {eventName}
            </div>
            <PencilLine size={18} />
          </>
        )}
      </div>

      <div className='h-10 flex justify-end items-center px-2'>
        {/* <RoomsDropDown /> */}
        <ProfileDropDownButton organizer={organizer} />
      </div>

    </div>
  )

}

export default Header