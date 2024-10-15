"use client";

import { convertTotalSectoHHMMSS } from '@/utils/convertor/convert-totalsec-to-hhmmss'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Loader, Plus } from 'lucide-react'
import { cloneEvent, createEvent, deleteEvent } from '@/app/_api/event';
import { useToast } from '../ui/use-toast';
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
import { Input } from '../ui/input';
import { getOrgById } from '@/app/_api/org';
import { useRouter } from 'next/navigation';
import { MoreVerticalIcon, Trash, Copy } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose
} from "@/components/ui/popover"

const RoomList = ({ organizer } : any ) => {

  const [rooms, setRooms] = useState([])
  const [showCreateNewEventForm, setShowCreateNewEventForm] = useState(false)
  const { toast } = useToast()
  const router = useRouter();

  const MiniTimerView = ({ time }: { time: string }) => {

    return (
      <div className='min-h-[120px] md:h-full w-full md:max-w-[120px] rounded-md bg-white border-[1px] border-slate-200 flex flex-col justify-start items-start overflow-hidden'>
        <p className='w-full h-full flex justify-center items-center'>
          {time == '0' ? "No Slot" : convertTotalSectoHHMMSS(parseInt(time)) }
        </p>
        <div className='relative w-full h-3 bg-slate-50 flex justify-start items-center'>
          <div className={`z-10 w-3/5 h-full bg-emerald-400`}></div>
          <div className={`z-10 w-1/5 h-full bg-amber-400`}></div>
          <div className='absolute top-0 left-0 w-full h-full bg-rose-400'></div>
        </div>
      </div>
    )

  }

  // CREATE NEW EVENT
  const createNewEvent = async ({ eventName, setIsLoading }: any) => {
    
    setIsLoading(true)
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
      const updatedOrganizer = await getOrgById({ id: organizer._id })
      if(updatedOrganizer.success) {
        setRooms(updatedOrganizer.message.events)
        localStorage.setItem('pitchtrack-organizer', JSON.stringify(updatedOrganizer.message))
      } else {
        toast({
          title: "Failed to fetch updated organizer data",
        })
      }

    } else {
      
      toast({
        title: "Event creation failed",
      })

    }
    setIsLoading(false)

  }

  const CreateNewEventForm = () => {

    const [eventName, setEventName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

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
            <AlertDialogAction onClick={() => {
              eventName === '' ? toast({ title: "Event name cannot be empty" }) : createNewEvent({ eventName, setIsLoading })
            }} className='bg-green-200 hover:bg-green-400'>
              {isLoading ?
                <Loader size={18} className='animate-spin text-black/40' strokeWidth={5}/>
                : 'Create'
              }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  // DELETE EVENT
  const handleDelete = async (roomId: any) => {
    const response = await deleteEvent({ orgId: organizer._id, eventId: roomId })
    if(response.success) {
      toast({
        title: "Event Deleted Successfully",
      })
      const updatedOrganizer = await getOrgById({ id: organizer._id })
      if(updatedOrganizer.success) {
        setRooms(updatedOrganizer.message.events)
        localStorage.setItem('pitchtrack-organizer', JSON.stringify(updatedOrganizer.message))
      } else {
        toast({
          title: "Failed to fetch updated organizer data",
        })
      }
    } else {
      toast({
        title: "Failed to delete event",
      })
    }
  }

  // CLONE EVENT
  const handleClone = async (roomId: any) => {
    const response = await cloneEvent({ orgId: organizer._id, eventId: roomId })
    if(response.success) {
      toast({
        title: "Event Cloned Successfully",
      })
      const updatedOrganizer = await getOrgById({ id: organizer._id })
      if(updatedOrganizer.success) {
        setRooms(updatedOrganizer.message.events)
        localStorage.setItem('pitchtrack-organizer', JSON.stringify(updatedOrganizer.message))
      } else {
        toast({
          title: "Failed to fetch updated organizer data",
        })
      }
    } else {
      toast({
        title: "Failed to clone event",
      })
    }
  }

  useEffect(() => {
    if(organizer) {
      setRooms(organizer.events)
    }
  }, [organizer])

  return (
    <div className="w-full h-full p-3 flex flex-col justify-start items-start gap-2">
      {showCreateNewEventForm && <CreateNewEventForm />}
      <div className='w-full flex justify-between items-center'>
        <p className='text-lg md:text-xl font-semibold'>Room List</p>
        <Button onClick={() => setShowCreateNewEventForm(true)} className='flex justify-start items-center gap-1 p-2 bg-emerald-100 rounded-md hover:bg-emerald-50 hover:border-emerald-600 border-[1px] transition-all duration-300'>
          <Plus size={14} className="stroke-emerald-600" />
          <p className="font-normal text-emerald-600">Create Room</p>
        </Button>
      </div>

      <div className='w-full min-h-full flex flex-col justify-start items-start gap-3 p-2 pb-20 overflow-y-scroll'>
        {rooms && rooms?.map((room: any, index: number) => (
          <div key={index} className='w-full min-h-fit md:min-h-24 flex flex-col md:flex-row justify-start items-center gap-3 p-3 rounded-md bg-slate-100'>
            {room.slots.length > 0
              ?
              <MiniTimerView time={room.slots[0].duration} />
              :
              <MiniTimerView time={'0'} />
            }
            <div className="w-full h-full flex flex-col justify-start items-start gap-1">
              <p className='text-lg font-semibold'>{room.title}</p>
              <div className='w-full flex justify-start items-start gap-5'>
                <div className='flex justify-start items-center gap-1'>
                  <p className='text-base font-light'>{room.slots.length}</p>
                  <p className='text-base font-light'>Time slots</p>
                </div>
                <div className='flex justify-start items-center gap-1'>
                  <p className='text-base font-light'>{room.messages.length}</p>
                  <p className='text-base font-light'>Messages</p>
                </div>
              </div>
            </div>
            <div className='w-full md:w-fit h-full flex flex-row-reverse md:flex-col justify-between items-end'>
              <div className="w-full flex justify-end items-center gap-2">
                <Button
                  className='px-3 py-2 h-fit font-normal bg-emerald-100 text-emerald-600 rounded-md hover:bg-emerald-50 border-[1px] hover:border-emerald-400 cursor-pointer transition-all duration-300'
                  onClick={() => router.push(`/${room._id}/dashboard`)}
                >
                  Enter
                </Button>
                <div className='cursor-pointer h-full flex justify-center items-center gap-[2px] rounded-md px-2'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <MoreVerticalIcon size={16} />
                    </PopoverTrigger>
                    <PopoverContent className='w-fit bg-slate-100 text-black p-2 grid grid-cols-1 gap-2'>
                      <PopoverClose className="group flex justify-start items-center gap-2 cursor-pointer" onClick={() => handleDelete(room._id)}>
                        <Trash size={16} className='stroke-slate-400 group-hover:stroke-rose-400'/>
                        <p className='text-sm font-medium text-slate-400 group-hover:text-rose-400'>Delete</p>
                      </PopoverClose>
                      <div className="flex justify-start items-center gap-2 cursor-pointer" onClick={() => handleClone(room._id)}>
                        <Copy size={16} className='stroke-emerald-600'/>
                        <p className='text-sm font-medium text-emerald-600'>Clone</p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <p className='text-xs font-light text-slate-400 whitespace-nowrap'>
                Updated At {new Date(room.updatedAt).getDate()}-{new Date(room.updatedAt).getMonth()}-{new Date(room.updatedAt).getFullYear()}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default RoomList