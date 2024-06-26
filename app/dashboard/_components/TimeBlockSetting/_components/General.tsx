"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PopoverClose } from '@/components/ui/popover';
import React from 'react'

const General = ({ slot, setSlot, handleSave }: any) => {

  return (
    <>
      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={slot.title}
          className='w-full col-span-3 p-1 px-2 border-0 bg-white'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlot({ ...slot, title: e.target.value })}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSave()}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="speaker">Speaker</Label>
        <Input
          id="speaker"
          value={slot.speaker}
          className='w-full col-span-3 p-1 px-2 border-0 bg-white'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlot({ ...slot, speaker: e.target.value })}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSave()}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="note">Note</Label>
        <Input
          id="note"
          value={slot.notes}
          className='w-full col-span-3 p-1 px-2 border-0 bg-white'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlot({ ...slot, notes: e.target.value })}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSave()}
        />
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

export default General