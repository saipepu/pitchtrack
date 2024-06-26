import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { Dot, Zap } from 'lucide-react'
import React from 'react'
import SortablePreset from './_components/SortableList'

const TimerPreset = () => {


  return (
    <div className='w-full border-l-[1px] border-slate-100 p-2 flex flex-col justify-start items-start gap-4 pb-[100px]'
    >
      {/* Header */}
      <div className='w-full h-[30px] flex justify-between items-center'>
        <div className='flex h-full justify-end items-center gap-1'>
          <h3 className='text-lg font-medium whitespace-nowrap'>Timers</h3>
          <Select>
            <SelectTrigger className='px-2 h-full border-0'>
              <p className='text-sm font-medium text-center text-slate-500'>Actions</p>
            </SelectTrigger>
            <SelectContent className='bg-white text-black'>
              <SelectItem value='edit'>Edit</SelectItem>
              <SelectItem value='delete'>Delete</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='h-full flex justify-end items-center gap-1'>
          <div className='cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] border-slate-300 px-2'>
            <Dot size={16} strokeWidth={10} />
            <p className='text-sm font-medium text-center'>Blackout</p>
          </div>
          <div className='cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] border-slate-300 px-2'>
            <Zap size={16} />
            <p className='text-sm font-medium text-center'>Flash</p>
        </div>
      </div>
      </div>

      <SortablePreset />
    </div>
  )
}

export default TimerPreset