"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PopoverClose } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react'

enum Appearance {
  Countdown = 'Countdown',
  Countup = 'Countup'
}

const Duration = ({ timer }: any) => {

  return (
    <>
      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="title">Title</Label>
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

export default Duration