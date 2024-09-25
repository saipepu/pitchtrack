"use client";

import { SlotContext } from '@/app/hooks/SlotContext';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft, ChevronRight, ClipboardCopy, Clock, Link, Palette, Pause, Play, Save, SaveAllIcon, SkipBack, SkipForward } from 'lucide-react'
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import PlayButton from '../../PlayButton/PlayButton';
import socket from '@/utils/socket';
import { toast } from '@/components/ui/use-toast';

const TimerPreview = () => {

  const { eventId } = useParams();
  const [currentTime, setCurrentTime] = useState('00:00:00')
  const { slots, isRunning, setIsRunning, runningSlot, setRunningSlot, isActive } = useContext(SlotContext)
  const [isCopied, setIsCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  let SkippingValues = [10, 30, 60]
  const [selectedSkippingValue, setSelectedSkippingValue] = useState(SkippingValues[0])

  useEffect(() => {
    setCurrentTime(`${new Date().getDate()}:${new Date().getHours()}:${new Date().getSeconds()}`)
    setRunningSlot(slots[0])
  },[slots])

  socket.on('timerUpdate', (message) => {

    setRunningSlot(slots.find((slot: any, i: number) => slot._id == message.slotId))
    if(eventId == message.eventId) {
      setIsRunning(message.isRunning)
      setIsLoading(false)
    }

  })

  const handleClipBoardCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${eventId}/audience/presentor`)
    setIsCopied(true)
    toast({
      title: 'Link copied to Clipboard'
    })
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  const handleSkipforward = () => {
    // skip 10s forward
    setIsLoading(true)
    socket.emit('skip', {
      eventId: eventId
    })
  }
  const handleRewind = () => {
    // skip 10s backward
    setIsLoading(true)
    socket.emit('rewind', {
      eventId: eventId
    })
  }

  // show the mini preview of timer
  return (
    <div className='w-full flex flex-col justify-start items-start gap-2'>

      {/* Header */}
      <div className='w-full h-[30px] flex justify-center items-center gap-2'>
        <div className='w-full h-full flex justify-center items-center'>
          <p className='text-md font-medium text-center'>Dashboard</p>
        </div>
        {/* <div className='cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] border-slate-300 px-2'>
          <Palette size={16} />
          <p className='text-sm font-medium text-center'>Customize</p>
        </div> */}
        {!isCopied ? (
          <div
            className='cursor-pointer bg-slate-100 w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] border-slate-300 px-2'
            onClick={() => handleClipBoardCopy()}
          >
            <Link size={16} strokeWidth={2.5}/>
            <p className='text-sm font-medium text-center'>Share</p>
          </div>
        ) : (
          <div className='cursor-pointer bg-green-400 w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] px-2'>
            <ClipboardCopy size={16} strokeWidth={2.5} className='text-white'/>
            <p className='text-sm font-medium text-center text-white'>Copied</p>
          </div>
        )}
      </div>

      {/* Timer Mini Preview */}
      <div className='border-[1px] border-slate-300 rounded-md w-full overflow-hidden'>
        <iframe
          src={`/${eventId || 'FALLBACK-EVENTID'}`}
          width="100%"
          height="300"
          style={{ border: 'none' }}
        />
      </div>

      {/* Timer Controls */}
      <div className='w-full h-[30px] flex justify-center items-center gap-1'>
        <Select defaultValue='-1m'>
          <SelectTrigger className="w-full h-full px-1 border-[1px] border-slate-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectGroup className='text-black bg-white'>
              {SkippingValues.map((key, i) => (
                <SelectItem key={i} value={`${key}`}>
                  {key}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className={`w-full h-full px-1 border-[1px] border-slate-300 rounded-md flex justify-center items-center cursor-pointer ${isLoading ? 'opacity-20 cursor-wait' : 'opacity-100'}`}
          onClick={() => handleRewind()}
        >
          <SkipBack size={16} />
        </div>

        {/* CUSTOMIZE PLAY BUTTON */}
        <PlayButton slot={runningSlot} eventId={eventId} isRunning={isRunning} setIsRunning={setIsRunning} isActive={isActive} />

        <div className={`w-full h-full px-1 border-[1px] border-slate-300 rounded-md flex justify-center items-center cursor-pointer ${isLoading ? 'opacity-20 cursor-wait' : 'opacity-100'}`}
          onClick={() => handleSkipforward()}
        >
          <SkipForward size={16} />
        </div>
        <Select defaultValue='+1m'>
          <SelectTrigger className="w-full h-full px-1 border-[1px] border-slate-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectGroup className='text-black'>
              {Array.from({ length: 3 }).map((_, i) => (
                <SelectItem key={i} value={`+${i+1}m`}>
                  +{i+1}m
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Extra Details */}
      <div className='hidden w-full md:flex flex-col justify-center items-center gap-1 p-4'>

        <div className='w-full flex justify-center items-center gap-1'>
          <div className='w-[15px] h-[1px] bg-slate-400'></div>
          <div className='w-full flex justify-center items-center gap-1'>
            <Clock size={16} />
            <p>{currentTime}</p>
          </div>
          <div className='w-full flex justify-center items-center gap-1'>
            <p className='text-sm leading-tight tracking-tighter text-slate-400'>Asia / Bangkok</p>
          </div>
          <div className='w-[15px] h-[1px] bg-slate-400'></div>
        </div>

        <div className='w-full flex justify-center items-center gap-1'>
          <ChevronLeft size={24} />
          <div className='w-full flex flex-col justify-center items-center'>
            <p className='text-xs text-slate-400'>Cue finish</p>
            <p>-:-</p>
          </div>
          <div className='w-full flex flex-col justify-center items-center'>
            <p className='text-xs text-slate-400'>Cue finish</p>
            <p className='text-sm leading-tight tracking-tighter text-slate-400'>-</p>
          </div>
          <ChevronRight size={24} />
        </div>

      </div>

    </div>
  )
}
export default TimerPreview