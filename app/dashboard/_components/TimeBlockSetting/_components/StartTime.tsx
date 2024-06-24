"use client";

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';
import React from 'react'

enum StartType {
  Manual = 'Manual',
  Scheduled = 'Scheduled'
}

const StartTime = ({ time } : any ) => {

  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <>
      <div className="grid grid-cols-4 items-center gap-2">
        <Select>
          <SelectTrigger className="w-full col-span-4 p-1 px-2 border-0 bg-white">
            <SelectValue placeholder="Select a Timer Appearance" />
          </SelectTrigger>
          <SelectContent className='bg-white text-black'>
            <SelectGroup>
              <SelectItem className="cursor-pointer bg-white" value={StartType.Manual}>{StartType.Manual}</SelectItem>
              <SelectItem className="cursor-pointer bg-white" value={StartType.Scheduled}>{StartType.Scheduled}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="title">Time</Label>
        <div className='w-full col-span-3 border-0 flex justify-start items-center'>
          <Input
            className="text-center w-full col-span-3 p-1 px-2 border-0 bg-white"
            id="HH"
            type="number"
            maxLength={3}
            defaultValue={'00'}
            onInput={(e: any) => e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)}
          />
          <span className='text-lg font-semibold mx-2'>:</span>
          <Input
            className="text-center w-full col-span-3 p-1 px-2 border-0 bg-white"
            id="MM"
            type="number"
            maxLength={3}
            defaultValue={'00'}
            onInput={(e: any) => e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)}
          />
          <span className='text-lg font-semibold mx-2'>:</span>
          <Input
            className="text-center w-full col-span-3 p-1 px-2 border-0 bg-white"
            id="SS"
            type="number"
            maxLength={3}
            defaultValue={'00'}
            onInput={(e: any) => e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="title">Date</Label>
        <div className='w-full col-span-3 border-0 flex justify-start items-center'>
          <Popover>
            <PopoverTrigger asChild>
              <div className='w-full flex justify-start items-center gap-2 bg-white pr-2'>
                <Input
                  className="text-left w-full col-span-3 p-1 px-2 border-0"
                  id="date"
                  type="text"
                  value={date?.toLocaleDateString() || ''}
                />
                <CalendarDays size={16} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="bg-white text-black p-0 grid grid-cols-1 gap-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className='w-full flex justify-end items-center gap-2'>
        <PopoverClose>
          <Button
            variant="outline" className='text-black p-2 rounded-lg hover:text-slate-400'
          >
            Cancel
          </Button>
        </PopoverClose>
        <PopoverClose>
          <Button
            className='bg-black text-white p-2 rounded-lg hover:bg-slate-400'
          >
            Save
          </Button>
        </PopoverClose>
      </div>
    </>
  )
}

export default StartTime