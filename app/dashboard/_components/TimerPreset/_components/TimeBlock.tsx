import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { convertTotalSectoHHMMSS } from '@/utils/convertor/convert-totalsec-to-hhmmss'
import { MoreVerticalIcon, Pencil, Play, Settings, SkipBack } from 'lucide-react'
import React from 'react'

const TimeBlock = ({ timer, i }: any) => {



  return (
    <div className='w-full h-[64px] flex justify-between items-center rounded-lg p-2 gap-2 bg-slate-100'>
        <div className='h-full flex justify-start items-center gap-4'>
          <p className='text-lg font-semibold text-slate-500'>{i+1}</p>
          <p className='text-lg font-semibold whitespace-nowrap'>{convertTotalSectoHHMMSS(timer.duration)}</p>
          <p className='text-lg font-semibold whitespace-nowrap'>{timer.name}</p>
          <div className='cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md  px-2'>
          <Popover>
            <PopoverTrigger asChild>
              <Pencil size={16} />
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-slate-100 text-black p-2 grid grid-cols-1 gap-1">
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
            </PopoverContent>
          </Popover>
          </div>
          
        </div>
        <div className='h-full max-h-[32px] flex justify-start items-center gap-2'>
        <div className='cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] border-slate-300 px-2'>
            <SkipBack size={16} />
        </div>
        <div className='cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] border-slate-300 px-2'>
            <Settings size={16} />
        </div>
        <div className='cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md border-[1px] border-slate-300 px-2'>
            <Play size={16} />
        </div>
        <div className='cursor-pointer w-full h-full flex justify-center items-center gap-[2px] rounded-md  px-2'>
            <MoreVerticalIcon size={16} />
        </div>
        </div>
    </div>
  )
}

export default TimeBlock