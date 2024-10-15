"use client";
import React, { useContext, useEffect } from 'react'
import SortableList from '../SortableList'
import { SlotContext } from '@/app/hooks/SlotContext';
import { convertTotalSectoHHMMSS } from '@/utils/convertor/convert-totalsec-to-hhmmss';
import { Button } from '@/components/ui/button';
import { updateAllSlot } from '@/app/_api/slot';
import { useParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const TimerPreset = () => {

  const { eventId } = useParams()
  const { slots } = useContext(SlotContext)
  const { toast } = useToast()

  // CALCULATE ESTIMATED STARTING TIME OF EACH SLOT BY ADDING DURATION TO THE PREVIOUS SLOT
  const calculatedEstimatedStartTimeForEachSlot = () => {

    let previousSlotEndTime= 0

    slots.map((slot: any, index: number) => {
      if (index === 0) {

        previousSlotEndTime = new Date(slot.startTime).getTime() + parseInt(slot.duration) * 1000
        slot.estimatedStartTime = new Date(slot.startTime).getTime()

      } else {

        console.log(slots[index-1].startTime, new Date(slots[index-1].startTime).getTime())
        slot.estimatedStartTime = new Date(slots[index-1].startTime).getTime() + parseInt(slots[index-1].duration) * 1000
        let s = new Date(slot.estimatedStartTime)
        slot.estimatedStartTimeFormatted = convertTotalSectoHHMMSS(s.getHours() * 3600 + s.getMinutes() * 60 + s.getSeconds())
        console.log(slot.estimatedStartTime)
        console.log(new Date(slot.estimatedStartTime))
        
      }
    })
    console.log(slots.map((slot: any) => slot.estimatedStartTimeFormatted))

  }

  // CALCULATE GAP TIME BETWEEN EACH SLOT
  const calculatedGapTimeForEachSlot = () => {
      
    slots.map((slot: any, index: number) => {

    // gap [negative, positive, zero]
    // gapTime [HH:MM:SS]
    // gapTotalSec [total seconds]

    slot.gap = 'zero'
    slot.gapTime = '00:00:00'
    slot.gapTotalSec = 0

      if(index > 0) {

        let currentSlotStartTime = new Date(slot.startTime).getTime()
        let previousSlotEndTime = 0
        if(slots[index - 1].startTimeType == 'linked') {
          console.log('linked', slots[index - 1].title, slots[index - 1].estimatedStartTime)
          previousSlotEndTime = new Date(slots[index - 1].estimatedStartTime).getTime() + parseInt(slots[index - 1].duration) * 1000
        } else {
          previousSlotEndTime = new Date(slots[index - 1].startTime).getTime() + parseInt(slots[index - 1].duration) * 1000
        }

        if(currentSlotStartTime - previousSlotEndTime < 0) {
          slot.gap = 'negative'
          slot.gapTime = convertTotalSectoHHMMSS((previousSlotEndTime - currentSlotStartTime) / 1000)
          slot.gapTotalSec = (previousSlotEndTime - currentSlotStartTime) / 1000
        } else if(currentSlotStartTime - previousSlotEndTime > 0) {
          slot.gap = 'positive'
          slot.gapTime = convertTotalSectoHHMMSS((currentSlotStartTime - previousSlotEndTime) / 1000)
          slot.gapTotalSec = (currentSlotStartTime - previousSlotEndTime) / 1000
        }
        
      }

    })
  
  }

  // QUICK FIX ALL TIME CONFLICTS
  const handleQuickFixAll = async () => {
    let updatedSlots = [...slots]
    updatedSlots.map((slot: any, index: number) => {

      if(index === 0) {
        slot.startTime = new Date(slot.startTime).toISOString()
      } else {
        let s = new Date(updatedSlots[index - 1].startTime).getTime() + parseInt(updatedSlots[index - 1].duration) * 1000
        slot.startTime = new Date(s).toISOString()
      }

    })
  
    const response = await updateAllSlot({ eventId: eventId, slots: updatedSlots })
    if(response.success) {
      console.log('All slots updated successfully')
      toast({
        title: "All slots updated successfully"
      })
    } else {
      console.log('Failed to update all slots', response)
      toast({
        title: "All slots updated successfully"
      })  
    }
  }

  useEffect(() => {

    calculatedEstimatedStartTimeForEachSlot()
    calculatedGapTimeForEachSlot()

  }, [slots])

  console.log(slots)

  return (
    <div className='w-full h-full border-l-[1px] p-2 flex flex-col justify-start items-start gap-4'>

      {/* Header */}
      <div className='w-full h-[30px] flex justify-between items-center'>
        <div className='w-full flex h-full justify-between items-center gap-1'>
          <h3 className='text-lg font-medium whitespace-nowrap'>Timers</h3>
          <Button
            className='h-full p-1 bg-slate-400 text-white rounded-md hover:bg-slate-500'
            onClick={() => handleQuickFixAll()}
          >Quick Fix All</Button>
        </div>
      </div>

      <SortableList tag={"timeslot"}/>

    </div>
  )
}

export default TimerPreset