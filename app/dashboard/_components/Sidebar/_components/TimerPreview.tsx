"use client";

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronDown, ChevronLeft, ChevronRight, Clock, Link, Palette, Play, SkipBack, SkipForward } from 'lucide-react'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const TimerPreview = () => {

  const [currentTime, setCurrentTime] = useState<any>()
  const pathname = usePathname();
  console.log(pathname)

  useEffect(() => {
    setCurrentTime(`${new Date().getDate()}:${new Date().getHours()}:${new Date().getSeconds()}`)
  },[])

  // show the mini preview of timer
  return (
    <div className='w-full flex flex-col justify-start items-start gap-2'>

      {/* Header */}
      <div className='w-full h-[30px] flex justify-center items-center gap-2'>
        <div className='w-full h-full flex justify-center items-center'>
          <p className='text-md font-medium text-center'>Dashboard</p>
        </div>
        <div className='cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] border-slate-300 px-2'>
          <Palette size={16} />
          <p className='text-sm font-medium text-center'>Customize</p>
        </div>
        <div className='cursor-pointer bg-slate-100 w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] border-slate-300 px-2'>
          <Link size={16} strokeWidth={2.5}/>
          <p className='text-sm font-medium text-center'>Share</p>
        </div>
      </div>

      {/* Timer Mini Preview */}
      <div className='border-[1px] border-slate-300 rounded-md w-full overflow-hidden'>
        <iframe
          // src="http://localhost:3000/audience/presentor"
          src="/audience/presentor"
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
              {Array.from({ length: 3 }).map((_, i) => (
                <SelectItem key={i} value={`-${i+1}m`}>
                  -{i+1}m
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className='w-full h-full px-1 border-[1px] border-slate-300 rounded-md flex justify-center items-center'>
          <SkipBack size={16} />
        </div>
        <div className='w-full h-full px-1 border-[1px] border-slate-300 rounded-md flex justify-center items-center'>
          <Play size={16} />
        </div>
        <div className='w-full h-full px-1 border-[1px] border-slate-300 rounded-md flex justify-center items-center'>
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