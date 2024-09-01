"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PopoverClose } from '@/components/ui/popover';
import React from 'react'

const General = ({ slot, setSlot, handleSave }: any) => {

  return (
    <>
      <div className="w-full grid grid-cols-7 items-center gap-2">
        <div className="w-full col-span-1 flex justify-start items-center gap-2">
          <Label htmlFor="title">Title</Label>
        </div>
        <Input
          id="title"
          value={slot.title || ""}
          className='w-full col-span-6 p-1 px-2 border-0 bg-white'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlot({ ...slot, title: e.target.value })}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            e.key === 'Enter' && handleSave(slot)
          }}
        />
      </div>
      <div className="w-full grid grid-cols-7 items-center gap-2">
        <div className="w-full min-w-[200px] col-span-1 flex justify-start items-center gap-2">
          <Label htmlFor="title">Speaker</Label>
        </div>
        <Input
          id="speaker"
          value={slot.speaker}
          className='w-full col-span-6 p-1 px-2 border-0 bg-white'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlot({ ...slot, speaker: e.target.value })}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSave(slot)}
        />
      </div>
      <div className="w-full grid grid-cols-7 items-center gap-2">
        <div className="w-full col-span-1 flex justify-start items-center gap-2">
          <Label htmlFor="title">Notes</Label>
        </div>
        <Input
          id="note"
          value={slot.notes}
          className='w-full col-span-6 p-1 px-2 border-0 bg-white'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlot({ ...slot, notes: e.target.value })}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSave(slot)}
        />
      </div>
    </>
  )
}

export default General