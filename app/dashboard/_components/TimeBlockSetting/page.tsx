import { Button } from '@/components/ui/button'
import { Cross, Settings, X } from 'lucide-react'
import React from 'react'
import General from './_components/General'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Duration from './_components/Duration'
import StartTime from './_components/StartTime'
import Support from './_components/Support'

interface PageProps {
  setShowSetting: (show: boolean) => void
}

const page = ({ setShowSetting, slot, setSlot, handleSave } : any) => {

  let s = parseInt(slot.startTime)
  let startTime = new Date(s).getHours().toString().padStart(2, '0  ') + ':' + new Date(s).getMinutes().toString().padStart(2, '0') + ':' + new Date(s).getSeconds().toString().padStart(2, '0')

  return (
    <div className='z-10 absolute flex justify-center items-center w-full h-full top-0 left-0 cursor-auto'>

      <div className="z-20 w-[70vw] max-w-[750px] flex flex-col justify-start items-start gap-5 bg-slate-100 rounded-lg p-4">

        <div className="w-full flex justify-between items-center gap-2">
          <div className='w-full flex justify-start items-center gap-2'>
            <Settings size={24} />
            <p className='text-lg font-semibold'>Settings for {slot.title}</p>
          </div>
          <X size={24} onClick={() => setShowSetting(false)} className='cursor-pointer'/>
        </div>

        <div className='w-full flex flex-col justify-start items-start gap-2'>
          <p className='lg font-bold'>General</p>
          <General slot={slot} setSlot={setSlot} handleSave={handleSave} />
        </div>

        <div className="w-full h-[2px] bg-slate-200"></div>

        <div className='w-full flex flex-col md:flex-row justify-start items-start gap-5'>
          <div className='w-full flex flex-col justify-start items-start gap-2'>
            <p className='lg font-bold'>Duration</p>
            <Duration slot={slot} setSlot={setSlot} handleSave={handleSave} />
          </div>
          <div className='w-full flex flex-col justify-start items-start gap-2'>
            <p className='lg font-bold'>Start Time</p>
            <StartTime slot={slot} setSlot={setSlot} handleSave={handleSave} startTime={startTime}/>
          </div>
        </div>

        <div className="w-full h-[2px] bg-slate-200"></div>
        
        <div className='w-full flex flex-col justify-start items-start gap-2'>
          <Support />
        </div>

        <div className='w-full flex justify-end items-center gap-2'>
          <Button
            className='' variant={'ghost'}
            onClick={() => setShowSetting(false)}
          >
            Cancel
          </Button>
          <Button
            className='text-green-600' variant={'outline'}
            onClick={() => setShowSetting(false)}
          >
            Confirm
          </Button>
        </div>

      </div>


      {/* Background */}
      <div className='absolute w-full h-full bg-black opacity-50'>
      </div>

    </div>
  )
}

export default page