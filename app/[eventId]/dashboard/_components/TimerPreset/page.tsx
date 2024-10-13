import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { Dot, Zap } from 'lucide-react'
import React from 'react'
import SortableList from '../SortableList'

const TimerPreset = () => {

  return (
    <div className='w-full h-full border-l-[1px] p-2 flex flex-col justify-start items-start gap-4'>

      {/* Header */}
      <div className='w-full h-[30px] flex justify-between items-center'>
        <div className='flex h-full justify-end items-center gap-1'>
          <h3 className='text-lg font-medium whitespace-nowrap'>Timers</h3>
        </div>
      </div>

      <SortableList tag={"timeslot"}/>

    </div>
  )
}

export default TimerPreset