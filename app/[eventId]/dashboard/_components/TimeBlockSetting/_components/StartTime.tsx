"use client";

import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';
import React, { useEffect, useState } from 'react'

enum StartType {
  Manual = 'manual',
  Scheduled = 'scheduled'
}

const StartTime = ({ slot, setSlot, startTime, handleSave } : any ) => {
  
  const [hh, mm, ss] = startTime.split(':')
  const [hour, setHour] = useState(hh)
  const [minute, setMinute] = useState(mm)
  const [second, setSecond] = useState(ss)

  const [date, setDate] = useState<Date | undefined>(new Date(slot.startTime))

  const [payload, setPayload] = useState<any>({})
  
  const handleInputChange = () => {
    let day = date || new Date()
    day.setHours(parseInt(hour))
    day.setMinutes(parseInt(minute))
    day.setSeconds(parseInt(second))
    let timestamp = day.getTime()

    let obj = {
      startTime: timestamp.toString(),
    }
    setPayload(obj)

    setSlot({...slot, startTime: day?.toISOString()})

  }

  useEffect(() => {
    if(hour == '' || minute == '' || second == '') return
    handleInputChange()
  }, [date, hour, minute, second])

  return (
    <>
      <div className="w-full grid grid-cols-4 items-center gap-2">
        <Select
          onValueChange={(value) => {
              setSlot({ ...slot, startTimeType: value})
            }
          }
          defaultValue={slot.startTimeType}
        >
          <SelectTrigger className="w-full col-span-4 p-1 px-2 border-0 bg-white">
            <SelectValue placeholder={slot.startTimeType} />
          </SelectTrigger>
          <SelectContent className='bg-white text-black'>
            <SelectGroup>
              <SelectItem onClick={(e) => e.stopPropagation()} className="cursor-pointer bg-white" value={StartType.Manual}>{StartType.Manual}</SelectItem>
              <SelectItem onClick={(e) => e.stopPropagation()} className="cursor-pointer bg-white" value={StartType.Scheduled}>{StartType.Scheduled}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full grid grid-cols-4 items-center gap-2">
        <Label htmlFor="title">Time</Label>
        <div className='w-full col-span-3 border-0 flex justify-start items-center'>
          <Input
            className="text-center w-full col-span-3 p-1 px-2 border-0 bg-white"
            id="HH"
            type="number"
            max={23}
            value={parseInt(hour).toString().padStart(2, '0')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if(parseInt(e.target.value) > 23) e.target.value = '23'
              if(e.target.value == '') e.target.value = '0'
              setHour(e.target.value)
            }}
          />
          <span className='text-lg font-semibold mx-2'>:</span>
          <Input
            className="text-center w-full col-span-3 p-1 px-2 border-0 bg-white"
            id="MM"
            type="number"
            value={parseInt(minute).toString().padStart(2, '0')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if(parseInt(e.target.value) > 100) {
                e.target.value = minute
              } else {
                if(parseInt(e.target.value) > 59) e.target.value = '59'
              }
              if(e.target.value == '') e.target.value = '0'
              setMinute(e.target.value)
            }}
          />
          <span className='text-lg font-semibold mx-2'>:</span>
          <Input
            className="text-center w-full col-span-3 p-1 px-2 border-0 bg-white"
            id="SS"
            type="number"
            maxLength={2}
            value={parseInt(second).toString().padStart(2, '0')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if(parseInt(e.target.value) > 100) {
                e.target.value = second
              } else {
                if(parseInt(e.target.value) > 59) e.target.value = '59'
              }
              if(e.target.value == '') e.target.value = '0'
              setSecond(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-4 items-center gap-2">
        <Label htmlFor="title">Date</Label>
        <div className='w-full col-span-3 border-0 flex justify-start items-center'>
          <Popover>
            <PopoverTrigger asChild>
              <div className='w-full flex justify-between items-center gap-2 bg-white pr-2 cursor-pointer'>
                <p className='text-sm p-1 px-2'>{date?.toLocaleDateString() || new Date().toLocaleDateString()}</p>
                <CalendarDays size={16} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="bg-white text-black p-0 grid grid-cols-1 gap-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => {
                  setDate(date)
                }}
                className="rounded-md border"
                // initialFocus
                fromDate={new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  )
}

export default StartTime