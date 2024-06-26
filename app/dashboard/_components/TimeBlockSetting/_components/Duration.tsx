"use client";

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PopoverClose } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { convertHHMMSStoTotalSec } from '@/utils/convertor/convert-hhmmss-to-totalsec';
import { convertTotalSectoHHMMSS } from '@/utils/convertor/convert-totalsec-to-hhmmss';
import React, { useEffect, useState } from 'react'

enum Appearance {
  Countdown = 'Countdown',
  Countup = 'Countup'
}

const Duration = ({ slot, setSlot, handleSave }: any) => {

  let hhmmss = convertTotalSectoHHMMSS(slot.duration)
  let [hh, mm, ss] = hhmmss.split(':')
  const [hour, setHour] = useState(hh)
  const [minute, setMinute] = useState(mm)
  const [second, setSecond] = useState(ss)


  const handleInputChange = () => {
    let totalSec = convertHHMMSStoTotalSec(`${hour}:${minute}:${second}`)
    setSlot({ ...slot, duration: totalSec })
  }

  useEffect(() => {
    if(hour == '' || minute == '' || second == '') return
    handleInputChange()
  }, [hour, minute, second])

  return (
    <>
      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="title">Title</Label>
        <div className='w-full col-span-3 border-0 flex justify-start items-center'>
          <Input
            className="text-center w-full col-span-3 p-1 px-2 border-0 bg-white"
            id="HH"
            type="number"
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
            maxLength={3}
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
            maxLength={3}
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
      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="appearance">Apperance</Label>
        <Select>
          <SelectTrigger className="w-full col-span-3 p-1 px-2 border-0 bg-white">
            <SelectValue placeholder="Select a Timer Appearance" />
          </SelectTrigger>
          <SelectContent className='bg-white text-black'>
            <SelectGroup>
              <SelectItem className="cursor-pointer bg-white" value={Appearance.Countdown}>{Appearance.Countdown}</SelectItem>
              <SelectItem className="cursor-pointer bg-white" value={Appearance.Countup}>{Appearance.Countup}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
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
    </>
  )
}

export default Duration