"use client";

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { PencilLine, Plus } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation';
import { createEvent, updateEventById } from '@/app/_api/event';

const Header = ({ organizer, event, events, fetchOrganizerData }: any) => {

  const { eventId } = useParams()
  const router = useRouter()
  const [isEventNameChanging, setIsEventNameChanging] = useState(false)
  const [eventName, setEventName] = useState(event?.title || 'Unnamed')
  const [position, setPosition] = useState('top')
  const [showCreateNewEventForm, setShowCreateNewEventForm] = useState(false)
  const { toast } = useToast()

  const DropDown = () => {

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Rooms</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px] bg-white p-2 rounded-lg shadow-md text-black -translate-x-10">
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {events?.map((event: any, i: number) => {

              return (
                <DropdownMenuCheckboxItem
                  key={i}
                  checked={event?._id === eventId}
                  onClick={() => {
                    router.push(`/${event?._id}/dashboard`)
                  }}
                >
                  {event?.title}
                </DropdownMenuCheckboxItem>
              )

            })}
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <div onClick={() => setShowCreateNewEventForm(true)} className='w-full flex justify-start items-center gap-1 p-2 cursor-pointer'>
            <Plus size={14} />
            <p>Create New Event</p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const CreateNewEventForm = () => {

    const [eventName, setEventName] = useState('')

    return (
      <AlertDialog open={showCreateNewEventForm}>
        <AlertDialogTrigger asChild className='hidden'>
          <Button variant="outline">Create New Event</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className='bg-white text-black'>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Event</AlertDialogTitle>
            <AlertDialogDescription>
              <Input
                autoFocus={true}
                placeholder='Event Name'
                value={eventName}
                onChange={(e) => {
                  
                  setEventName(e.target.value)

                  }
                }
                className='w-full placeholder:text-slate-400'
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowCreateNewEventForm(false)} className='border-none'>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => createNewEvent({ eventName })} className='bg-slate-200 hover:bg-slate-400'>Create</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  // CREATE NEW EVENT
  const createNewEvent = async ({ eventName }: any) => {
      
    let dto = {
      title: eventName,
    }

    if(eventName === '') {
      toast({
        title: "Event name cannot be empty",
      })
      return
    }

    const newEvent = await createEvent({ orgId: organizer._id, event: dto })

    if(newEvent.success) {

      toast({
        title: "Event creation Successful",
      })
      setShowCreateNewEventForm(false)
      fetchOrganizerData()

    } else {
      
      toast({
        title: "Event creation failed",
      })

    }

  }

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
      setShowCreateNewEventForm(false)
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

      {showCreateNewEventForm && <CreateNewEventForm />}

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
        <DropDown />
        <div className='cursor-pointer text-sm font-medium whitespace-nowrap'
          onClick={() => {
            localStorage.removeItem('pitchtrack-token')
            router.push('/')
            }
          }
        >
          Sign Out
        </div>
      </div>

    </div>
  )

}

export default Header