"use client";

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PopoverClose } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { convertHHMMSStoTotalSec } from '@/utils/convertor/convert-hhmmss-to-totalsec';
import { convertTotalSectoHHMMSS } from '@/utils/convertor/convert-totalsec-to-hhmmss';
import React, { useEffect, useState } from 'react'

enum Appearance {
  Countdown = 'countdown',
  Countup = 'countup'
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
      <div className="w-full grid grid-cols-4 items-center gap-2">
        <div className='w-full flex justify-start items-center gap-2'>
          <Label htmlFor="title">Time</Label>
        </div>
        <div className='w-full col-span-3 border-0 flex justify-start items-center'>
          <>
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
          </>
          <span className='text-lg font-semibold mx-2'>:</span>
          <Input
            className="text-center w-full col-span-3 p-1 px-2 border-0 bg-white placeholder:text-slate-400"
            id="MM"
            type="number"
            maxLength={3}
            placeholder='00'
            value={parseInt(minute).toString().padStart(2, '0')}
            // value={minute}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

              if(parseInt(e.target.value) > 59) e.target.value = '59'
              if(e.target.value == '') e.target.value = '0'
              setMinute(parseInt(e.target.value).toString().trim())

            }}
          />
          <span className='text-lg font-semibold mx-2'>:</span>
          <Input
            className="text-center w-full col-span-3 p-1 px-2 border-0 bg-white placeholder:text-slate-400"
            id="SS"
            type="number"
            maxLength={3}
            placeholder='00'
            value={parseInt(second).toString().padStart(2, '0')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

              if(parseInt(e.target.value) > 59) e.target.value = '59'
              if(e.target.value == '') e.target.value = '0'
              setSecond(parseInt(e.target.value).toString().trim())

            }}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-4 items-center gap-2">
        <div className='w-full col-span-1 flex justify-start items-center gap-2 truncate text-ellipsis'>
          <Label htmlFor="Appearance">Appearance</Label>
        </div>
        <Select
          onValueChange={(value) => {
              setSlot({ ...slot, appearance: value})
            }
          }
          defaultValue={slot.appearance}
        >
          <SelectTrigger className="w-full text-left col-span-3 p-1 px-2 border-0 bg-white">
            <SelectValue placeholder={slot.appearance} />
          </SelectTrigger>
          <SelectContent className='bg-white text-black'>
            <SelectGroup>
              <SelectItem className="cursor-pointer bg-white" value={Appearance.Countdown}>{Appearance.Countdown}</SelectItem>
              <SelectItem className="cursor-pointer bg-white" value={Appearance.Countup}>{Appearance.Countup}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

export default Duration