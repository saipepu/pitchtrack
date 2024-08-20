"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { convertTotalSectoHHMMSS } from '@/utils/convertor/convert-totalsec-to-hhmmss'
import { Equal, MoreVerticalIcon, Pencil, Play, Settings, SkipBack } from 'lucide-react'
import React, { use, useContext, useEffect, useState } from 'react'
import General from '../../TimeBlockSetting/_components/General'
import Duration from '../../TimeBlockSetting/_components/Duration'
import StartTime from '../../TimeBlockSetting/_components/StartTime'
import TimeBlockSetting from '../../TimeBlockSetting/page'
import { SlotContext } from "@/app/hooks/SlotContext";

enum PopoverType {
  General = 'General',
  Settings = 'Settings',
  StartTime = 'StartTime',
  Duration = 'Duration',
  Actions = 'Actions',
}

const TimeBlock = ({ timer, currentSlot }: any) => {

  const { slots, setSlots } = useContext(SlotContext)

  const [slot, setSlot] = useState(slots[currentSlot]) // make a copy of the original slot
  const [showSetting, setShowSetting] = useState(false)

  let s = parseInt(slot?.startTime)
  let startTime = new Date(s).getHours().toString().padStart(2, '0  ') + ':' + new Date(s).getMinutes().toString().padStart(2, '0') + ':' + new Date(s).getSeconds().toString().padStart(2, '0')

  let duration: any = convertTotalSectoHHMMSS(slot?.duration).split(':').map((i: string) => i)
  duration = duration[0] == '00' ? duration.slice(1).join(':') : duration.join(':')
  
  const handleSave = () => {

    slots[currentSlot] = slot
    setSlots([...slots])
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
                <p className='min-w-[65px] text-sm md:text-lg font-semibold whitespace-nowrap select-none'>{duration.split(':').slice(1).join(':')}</p>
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
            <MoreVerticalIcon size={16} />
        </div>
      </div>
      
    </div>
  )
}

export default TimeBlock