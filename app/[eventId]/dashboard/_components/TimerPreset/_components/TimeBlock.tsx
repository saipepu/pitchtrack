"use client";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { convertTotalSectoHHMMSS } from '@/utils/convertor/convert-totalsec-to-hhmmss'
import { Copy, Equal, LoaderCircle, MoreVerticalIcon, Pencil, Settings, SkipBack, Trash } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import General from '../../TimeBlockSetting/_components/General'
import Duration from '../../TimeBlockSetting/_components/Duration'
import StartTime from '../../TimeBlockSetting/_components/StartTime'
import TimeBlockSetting from '../../TimeBlockSetting/TimeBlockSetting'
import { SlotContext } from "@/app/hooks/SlotContext";
import { updateSlot, deleteSlot, cloneSlot } from "@/app/_api/slot";
import { useParams } from 'next/navigation';
import PlayButton from '../../PlayButton/PlayButton';
import { toast } from '@/components/ui/use-toast';
import socket from '@/utils/socket';
import { Button } from '@/components/ui/button';

const TimeBlock = ({ index }: any) => {

  const { eventId } = useParams();
  const { slots, setSlots, isRunning, setIsRunning, isActive, setIsActive, setRunningSlot } = useContext(SlotContext)
  const [slot, setSlot] = useState(slots[index]) // MAKE A COPY OF THE SLOT
  const [showSetting, setShowSetting] = useState(false)
  const [socketSlotId, setSocketSlotId] = useState('')
  const [warningMessage, setWarningMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // FORMAT START TIME UTC TIME TO HH:MM:SS
  let s = slot?.startTime ? new Date(slot?.startTime) : new Date()
  let startTime = new Date(s).getHours().toString().padStart(2, '0  ') + ':' + new Date(s).getMinutes().toString().padStart(2, '0') + ':' + new Date(s).getSeconds().toString().padStart(2, '0')

  // FORMAT DURATION TOTAL SECONDS TO HH:MM:SS
  let duration: any = convertTotalSectoHHMMSS(slot?.duration).split(':').map((i: string) => i)
  duration = duration[0] == '00' ? duration.slice(1).join(':') : duration.join(':')
  
  const handleSave = async (slot: any) => {

    // TO BE OPTIMIZED
    slots[index] = {...slot, tag: 'timeslot' }
    setSlots([...slots])

    let dto = { ...slot }
    delete dto._id
    delete dto.createdAt
    delete dto.updatedAt
    delete dto.estimatedStartTimeFormatted
    delete dto.estimatedStartTime
    delete dto.gap
    delete dto.gapTime
    delete dto.gapTotalSec
    
    // UPDATE SLOT
    const response = await updateSlot({ eventId, slotId: slot._id, slot: dto })

    if(response.success) {
      console.log('Slot updated successfully')
      toast({
        title: "Slot updated successfully"
      })
    } else {
      console.log('Failed to update slot', response)
      toast({
        title: "Slot updated failed"
      })
    }

  }

  const handleQuickFix = () => {

    if(slot.gap == 'negative') {
      slot.startTime = new Date(new Date(slot.startTime).getTime() + slot.gapTotalSec * 1000)
    } else if(slot.gap == 'positive') {
      slot.startTime = new Date(new Date(slot.startTime).getTime() - slot.gapTotalSec * 1000)
    }
    console.log('QUICK FIX', slot.startTime)
    setSlot({...slot})
    handleSave(slot)
  }

  const handleDelete = async () => {
  
      // DELETE SLOT
      const response = await deleteSlot({ eventId, slotId: slot._id })
  
      if(response.success) {
        console.log('Slot deleted successfully')
        slots.splice(index, 1)
        setSlots([...slots])
      } else {
        console.log('Failed to delete slot')
      }

  }

  const handleClone = async () => {
    let dto = { ...slot }
    delete dto._id
    const response = await cloneSlot({ eventId, slotId: slot._id })

    if(response.success) {
      console.log('Slot cloned successfully')
      toast({
        title: "Slot cloned successfully"
      })
      console.log(response.message.slots.map((x:any) => x.sortOrder))
    } else {
      console.log('Failed to clone slot', response)
      toast({
        title: "Slot cloned failed"
      })
    }
  }

  useEffect(() => {
    setSlot(slots[index])
  }, [slots])

  socket.on("timerUpdate", (message) => {

    setIsLoading(false)
    // UPDATE THE GLOBAL RUNNING SLOT
    setSocketSlotId(message.slotId)
    if(eventId == message.eventId && slot._id == message.slotId) {
      setRunningSlot(slots.find((slot: any, i: number) => slot._id == message.slotId))
      setIsRunning(message.isRunning)
      setIsActive(message.slotId === slot._id)
      setCountdown(message.remainingTime)
    }

  })

  // const PopoverHandler = () => {
  //   return (
  //     <div className='w-full flex justify-end items-center gap-2'>
  //       <PopoverClose className="popover-close">
  //         <div
  //           className='text-black p-2 rounded-lg hover:text-slate-400'
  //         >
  //           Cancel
  //         </div>
  //       </PopoverClose>
  //       <PopoverClose className='popover-close'>
  //         <div
  //           className='bg-black text-white p-2 rounded-lg hover:bg-slate-400'
  //           onClick={() => handleSave(slot)}
  //         >
  //           Save
  //         </div>
  //       </PopoverClose>
  //     </div>
  //   )
  // }

  const handlePlayPreviousSlot = () => {
    console.log('PLAY PREVIOUS SLOT')
    setIsLoading(true)
    socket.emit('playPreviousSlot', {
      eventId: eventId
    })
  }

  // CLOSE SETTING ON ESCAPE
  document.onkeydown = (e) => {
    if(e.key == 'Escape') setShowSetting(false)
  }

  return (
    <>
      {showSetting && (
        <TimeBlockSetting setShowSetting={setShowSetting} slot={slot} setSlot={setSlot} handleSave={handleSave}/>
      )}
      {slot.gap !== 'zero' && slot.startTimeType !== 'linked' && 
        <div className={`w-full p-1 mb-1 rounded-md border-dashed border-[1px] border-slate-400 flex justify-between items-center`}>
          <div className="w-full flex justify-start items-center gap-2 pl-2">
            {slot.gap == 'negative' &&
              <p className='text-xs text-rose-400'>
                Late: {slot.gapTime} behind previous slot
              </p>
            }
            {slot.gap == 'positive' &&
              <p className='text-xs text-emerald-400'>
                Gap: {slot.gapTime} between
              </p>
            }
          </div>
          <Button className='h-fit p-1' onClick={() => {
            handleQuickFix()
          }}>
            <p className='text-xs text-slate-400'>Reset</p>
          </Button>
        </div>
      }
      <div
        id={`${slots[index].tag + "-" + slots[index].id}`}
        className={`
                    relative group/slot w-full h-[80px] flex justify-between items-center rounded-lg p-2 gap-2
                    ${isActive && socketSlotId == slot._id ? 'border-2 border-emerald-500' : 'bg-slate-100'}
                    transition-all duration-300 overflow-visible
                  `}
      >
        {/* BACKGROUND PROGRESS */}
        <div className='absolute top-0 left-0 w-full h-full bg-transparent pointer-events-none select-none rounded-lg flex justify-start items-start overflow-hidden'>
          {isActive && socketSlotId == slot._id && (
            <div className='h-full bg-green-100 transition-all duration-1000 ease-linear' style={{ width: `${100 - (countdown/slot.duration * 100)}%` }}></div>
          )}
        </div>
        {/* LINKING BAR */}
        {slot?.startTimeType == "linked" && slot?.sortOrder > 0 && <div className="z-30 absolute left-[4%] -top-6 w-2 h-8 bg-slate-500 rounded-lg ring-white ring-4"></div>}
        {isLoading && (
          <div className="z-20 absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-[1px] border-2 border-slate-200 flex justify-center items-center rounded-lg">
            <LoaderCircle size={32} className='animate-spin text-white/90' strokeWidth={5}/>
          </div>
        )}
        {/* OVERLAY FOR BLOCKING EDITING */}
        {isRunning && socketSlotId == slot._id && (
          <div className="z-20 absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-not-allowed rounded-lg"
            onClick={() => {
              setWarningMessage('Can edit a running slot')
              setTimeout(() => {
                setWarningMessage('')
              }, 2000)
            }}
          >
            {warningMessage &&
            <div className="w-full h-full flex justify-center items-center bg-black/50 backdrop-blur-[2px] rounded-lg">
              <p className='font-bold text-white'>{warningMessage}</p>
            </div>}
          </div>
        )}
        <div className='w-full h-full flex justify-start items-center gap-1 md:gap-4 z-10'>

          <div className='relative min-w-[16px] h-full flex justify-center items-center'>
            <p className='absolute group-hover/slot:opacity-0 text-lg font-semibold text-slate-500 duration-500 select-none'>{index+1}</p>
            <div className='absolute block'>
              <Equal size={16} className='group-hover/slot:opacity-100 opacity-0 duration-500'/>
            </div>
          </div>
          <div className='hidden md:flex cursor-pointer w-full max-w-[88px] h-full justify-center items-center gap-[2px] rounded-md px-2'>
            <Popover onOpenChange={(open) => !open && handleSave(slot)}>
              <PopoverTrigger asChild>
                <div className='w-full relative'>
                  <p className='group-hover/slot:opacity-100 opacity-0 duration-500 text-xs text-slate-400 font-normal whitespace-nowrap select-none'>Start time</p>
                  <p className={`text-lg font-semibold whitespace-nowrap select-none ${slot?.startTimeType == "linked" && 'text-slate-300'}`}>{slot?.startTimeType == "linked" ? slot.estimatedStartTimeFormatted : startTime}</p>
                  <p className='group-hover/slot:opacity-100 opacity-0 duration-500 text-xs text-slate-400 font-normal whitespace-nowrap select-none'>{slot?.startTimeType || "Start Type"}</p>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-slate-100 text-black p-2 grid grid-cols-1 gap-2">
                <StartTime index={index} slot={slot} setSlot={setSlot} startTime={startTime} handleSave={handleSave}/>
                {/* <PopoverHandler /> */}
              </PopoverContent>
            </Popover>
          </div>
          <div className={`cursor-pointer w-full max-w-[70px] md:max-w-[88px] h-full flex justify-center items-center gap-[2px] rounded-md px-2 ${isActive && socketSlotId == slot._id ? "pointer-events-none select-none": ""}`}>
            <Popover onOpenChange={(open) => !open && handleSave(slot)}>
              <PopoverTrigger asChild>
                <div className='w-full relative'>
                  <p className='xl:group-hover/slot:opacity-100 xl:opacity-0 duration-500 text-xs text-slate-400 font-normal whitespace-nowrap select-none'>Duration</p>
                  <p className='md:min-w-[65px] text-sm md:text-lg font-semibold whitespace-nowrap select-none'>{duration}</p>
                  <p className='group-hover/slot:opacity-100 opacity-0 duration-500 text-xs text-slate-400 font-normal whitespace-nowrap select-none'>Countdown</p>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] bg-slate-100 text-black p-2 grid grid-cols-1 gap-2 translate-x-5">
                <Duration slot={slot} setSlot={setSlot} handleSave={handleSave}/>
                {/* <PopoverHandler /> */}
              </PopoverContent>
            </Popover>
          </div>
          <div className='cursor-pointer w-full max-w-[165px] md:max-w-full  h-full flex justify-center items-center gap-[2px] rounded-md  px-2'>
            <Popover onOpenChange={(open) => !open && handleSave(slot)}>
              <PopoverTrigger asChild>
                <div className='w-full flex justify-start items-center gap-2 group'>
                  <p className='text-sm md:text-lg font-semibold whitespace-nowrap select-none truncate'>{slot?.title}</p>
                  <Pencil size={16} className='opacity-0 group-hover/slot:opacity-100 duration-500'/>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] md:w-[420px] bg-slate-100 text-black p-2 grid grid-cols-1 gap-2">
                <General slot={slot} setSlot={setSlot} handleSave={handleSave}/>
                {/* <PopoverHandler /> */}
              </PopoverContent>
            </Popover>
          </div>

        </div>

        <div className='h-full max-h-[24px] md:max-h-[32px] flex justify-start items-center gap-1 md:gap-2'>
          <div className='z-10 cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] border-slate-300 px-1 md:px-2'
            onClick={() => handlePlayPreviousSlot()}
          >
              <SkipBack size={16} />
          </div>
          <div
            className='z-10 cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] border-slate-300 px-1 md:px-2'
            onClick={() => setShowSetting(true)}
          >
              <Settings size={16} />
          </div>

          {/* PLAY BUTTON */}
          <PlayButton slot={slot} eventId={eventId} isRunning={isRunning && socketSlotId == slot._id} setIsRunning={setIsRunning} isActive={isActive && socketSlotId == slot._id} setIsLoading={setIsLoading} />

          <div className='z-10 cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md  px-2'>
            <Popover onOpenChange={(open) => {}}>
              <PopoverTrigger asChild>
                <MoreVerticalIcon size={16} />
              </PopoverTrigger>
              <PopoverContent className='w-fit bg-slate-100 text-black p-2 grid grid-cols-1 gap-2'>
                <PopoverClose className="group flex justify-start items-center gap-2 cursor-pointer" onClick={() => handleDelete()}>
                  <Trash size={16} className='stroke-slate-400 group-hover:stroke-rose-400'/>
                  <p className='text-sm font-medium text-slate-400 group-hover:text-rose-400'>Delete</p>
                </PopoverClose>
                <div className="flex justify-start items-center gap-2 cursor-pointer" onClick={() => handleClone()}>
                  <Copy size={16} className='stroke-emerald-600'/>
                  <p className='text-sm font-medium text-emerald-600'>Clone</p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default TimeBlock