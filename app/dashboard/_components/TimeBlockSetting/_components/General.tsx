"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PopoverClose } from '@/components/ui/popover';
import React from 'react'

const General = ({ timer }: any) => {

  return (
    <>
      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          defaultValue={timer.name}
          className='w-full col-span-3 p-1 px-2 border-0 bg-white'
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="speaker">Speaker</Label>
        <Input
          id="speaker"
          defaultValue={"presentor jack"}
          className='w-full col-span-3 p-1 px-2 border-0 bg-white'
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="note">Note</Label>
        <Input
          id="note"
          defaultValue={"some notes"}
          className='w-full col-span-3 p-1 px-2 border-0 bg-white'
        />
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

export default General