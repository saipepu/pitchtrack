"use client";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { convertTotalSectoHHMMSS } from '@/utils/convertor/convert-totalsec-to-hhmmss'
import { Copy, Equal, MoreVerticalIcon, Pencil, Play, Settings, SkipBack, Trash } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import General from '../../TimeBlockSetting/_components/General'
import Duration from '../../TimeBlockSetting/_components/Duration'
import StartTime from '../../TimeBlockSetting/_components/StartTime'
import TimeBlockSetting from '../../TimeBlockSetting/page'
import { SlotContext } from "@/app/hooks/SlotContext";
import { updateSlot, deleteSlot } from "@/app/_api/slot";

enum PopoverType {
  General = 'General',
  Settings = 'Settings',
  StartTime = 'StartTime',
  Duration = 'Duration',
  Actions = 'Actions',
}

const TimeBlock = ({ timer, currentSlot }: any) => {

  const { slots, setSlots, event } = useContext(SlotContext)
  const [slot, setSlot] = useState(slots[currentSlot]) // make a copy of the original slot
  let eventId = event._id
  let slotId = slot._id
  const [showSetting, setShowSetting] = useState(false)

  let s = slot?.startTime ? new Date(slot?.startTime) : new Date()
  console.log(s, 'start time', slot.title)
  let startTime = new Date(s).getHours().toString().padStart(2, '0  ') + ':' + new Date(s).getMinutes().toString().padStart(2, '0') + ':' + new Date(s).getSeconds().toString().padStart(2, '0')

  let duration: any = convertTotalSectoHHMMSS(slot?.duration).split(':').map((i: string) => i)
  duration = duration[0] == '00' ? duration.slice(1).join(':') : duration.join(':')
  
  const handleSave = async () => {

    // TO BE OPTIMIZED
    slots[currentSlot] = slot
    setSlots([...slots])

    let dto = { ...slot}
    delete dto._id

    // UPDATE SLOT
    const response = await updateSlot({ eventId, slotId, slot: dto })

    if(response.success) {
      console.log('Slot updated successfully')
    } else {
      console.log('Failed to update slot')
    }
    console.log(response, 'updated slot response')

  }

  const handleDelete = async () => {
  
      // DELETE SLOT
      const response = await deleteSlot({ eventId, slotId })
  
      if(response.success) {
        console.log('Slot deleted successfully')
        slots.splice(currentSlot, 1)
        setSlots([...slots])
      } else {
        console.log('Failed to delete slot')
      }
      console.log(response, 'deleted slot response')
  }

  useEffect(() => {
    setSlot(slots[currentSlot])
  }, [slots])

  const PopoverHandler = () => {
    return (
      <div className='w-full flex justify-end items-center gap-2'>
        <PopoverClose>
          <div
            className='text-black p-2 rounded-lg hover:text-slate-400'
          >
            Cancel
          </div>
        </PopoverClose>
        <PopoverClose>
          <div
            className='bg-black text-white p-2 rounded-lg hover:bg-slate-400'
            onClick={() => handleSave()}
          >
            Save
          </div>
        </PopoverClose>
      </div>
    )
  }

  return (
    <div id={`${slots[currentSlot].tag + "-" + slots[currentSlot].id}`} className='group/slot w-full h-[80px] flex justify-between items-center rounded-lg p-2 gap-2 bg-slate-100'>
      {showSetting && (
        <TimeBlockSetting setShowSetting={setShowSetting} slot={slot} setSlot={setSlot} handleSave={handleSave}/>
      )}
      <div className='h-full flex justify-start items-center gap-1 md:gap-4'>

        <div className='relative min-w-[16px] h-full flex justify-center items-center'>
          <p className='absolute group-hover/slot:opacity-0 text-lg font-semibold text-slate-500 duration-500 select-none'>{currentSlot+1}</p>
          <div className='absolute block'>
            <Equal size={16} className='group-hover/slot:opacity-100 opacity-0 duration-500'/>
          </div>
        </div>
        <div className='hidden md:flex cursor-pointer w-full h-full justify-center items-center gap-[2px] rounded-md px-2'>
          <Popover onOpenChange={(open) => !open && handleSave()}>
            <PopoverTrigger asChild>
              <div className='min-w-[65px] relative'>
                <p className='group-hover/slot:opacity-100 opacity-0 duration-500 text-xs text-slate-400 font-normal whitespace-nowrap select-none'>Start time</p>
                <p className='text-lg font-semibold whitespace-nowrap select-none'>{startTime}</p>
                <p className='opacity-0 duration-500 text-xs text-slate-400 font-normal whitespace-nowrap select-none'>Start time</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-slate-100 text-black p-2 grid grid-cols-1 gap-2">
              <StartTime slot={slot} setSlot={setSlot} startTime={startTime} handleSave={handleSave}/>
              <PopoverHandler />
            </PopoverContent>
          </Popover>
        </div>
        <div className='cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md px-2'>
          <Popover onOpenChange={(open) => !open && handleSave()}>
            <PopoverTrigger asChild>
              <div className='min-w-[65px] relative'>
                <p className='group-hover/slot:opacity-100 md:opacity-0 duration-500 text-xs text-slate-400 font-normal whitespace-nowrap select-none'>Duration</p>
                <p className='min-w-[65px] text-sm md:text-lg font-semibold whitespace-nowrap select-none'>{duration}</p>
                <p className='group-hover/slot:opacity-100 opacity-0 duration-500 text-xs text-slate-400 font-normal whitespace-nowrap select-none'>Countdown</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] bg-slate-100 text-black p-2 grid grid-cols-1 gap-2 translate-x-5">
              <Duration slot={slot} setSlot={setSlot} handleSave={handleSave}/>
              <PopoverHandler />
            </PopoverContent>
          </Popover>
        </div>
        <div className='cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md  px-2'>
          <Popover onOpenChange={(open) => !open && handleSave()}>
            <PopoverTrigger asChild>
              <div className='min-w-[65px] flex justify-center items-center gap-2 group'>
                <p className='text-sm md:text-lg font-semibold whitespace-nowrap select-none'>{slot?.title}</p>
                <Pencil size={16} className='opacity-0 group-hover/slot:opacity-100 duration-500'/>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] md:w-[420px] bg-slate-100 text-black p-2 grid grid-cols-1 gap-2">
              <General slot={slot} setSlot={setSlot} handleSave={handleSave}/>
              <PopoverHandler />
            </PopoverContent>
          </Popover>
        </div>

      </div>

      <div className='h-full max-h-[24px] md:max-h-[32px] flex justify-start items-center gap-1 md:gap-2'>
        <div className='cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] border-slate-300 px-1 md:px-2'>
            <SkipBack size={16} />
        </div>
        <div
          className='cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] border-slate-300 px-1 md:px-2'
          onClick={() => setShowSetting(true)}
        >
            <Settings size={16} />
        </div>
        <div className='cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] border-slate-300 px-1 md:px-2'>
            <Play size={16} />
        </div>
        <div className='cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md  px-2'>
          <Popover onOpenChange={(open) => {}}>
            <PopoverTrigger asChild>
              <MoreVerticalIcon size={16} />
            </PopoverTrigger>
            <PopoverContent className='w-fit bg-slate-100 text-black p-2 grid grid-cols-1 gap-2'>
              <PopoverClose className="flex justify-start items-center gap-2 cursor-pointer" onClick={() => handleDelete()}>
                <Trash size={16} className='stroke-red-600'/>
                <p className='text-sm font-medium text-red-600'>Delete</p>
              </PopoverClose>
              <div className="flex justify-start items-center gap-2 opacity-15">
                <Copy size={16} className='stroke-purple-600'/>
                <p className='text-sm font-medium text-purple-600'>Clone</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
    </div>
  )
}

export default TimeBlock