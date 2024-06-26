"use client"
import React, { createContext, useState } from 'react'
import Sidebar from './_components/Sidebar/page'
import TimerPreset from './_components/TimerPreset/page'
import MessageList from './_components/MessageList/page'
import { Input } from '@/components/ui/input'
import { PencilLine } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import slotList from '@/utils/dummy-data/slots'

export const SlotContext = createContext<any>(null)

const page = () => {

  const [isRoomNameChanging, setIsRoomNameChanging] = useState(false)
  const [roomName, setRoomName] = React.useState('Unnamed')
  const [position, setPosition] = React.useState("bottom")

  const [slots, setSlots] = useState(slotList)

  const DropDown = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Rooms</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white p-2 rounded-lg shadow-md text-black">
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <SlotContext.Provider value={{slots, setSlots}}>
      <div className='w-full h-full overflow-hidden'>

        {/* Header */}
        <div className='w-full flex justify-center items-center border-b-[1px] border-slate-100 p-2'>
          <div className='w-1/2 h-10 flex justify-start items-center'>
          {isRoomNameChanging ? (
            <>
              <Input
                autoFocus={true}
                placeholder='Unnamed'
                value={roomName}
                onChange={(e) => {
                    setRoomName(e.target.value)
                  }
                }
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsRoomNameChanging(false)
                    }
                  }
                }
                className='text-2xl max-w-full w-fit bg-transparent font-bold focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:border-0'
              />
              <PencilLine size={18} />
            </>
            ): 
            (
            <>
              <div
                className='text-2xl max-w-full w-fit bg-transparent font-bold px-3 py-2'
                onClick={() => setIsRoomNameChanging(true)}
              >
                {roomName}
              </div>
              <PencilLine size={18} />
            </>
            )}
          </div>
          <div className='w-1/2 h-10 flex justify-end items-center'>
            <DropDown />
            <div className='cursor-pointer text-sm font-medium'>
              Sign In
            </div>
          </div>
        </div>

        <div className='w-full h-full flex justify-start items-start'
        >
          {/* Sidebar */}
          <div className='hidden md:flex flex-2 w-[35vw] min-w-[300px] h-full overflow-x-hidden overflow-y-scroll'>
            <Sidebar />
          </div>

          {/* Timer Preset */}
          <div className='flex-4 w-full h-full overflow-x-hidden overflow-y-scroll'>
            <TimerPreset />
          </div>

          {/* Message List */}
          <div className='hidden lg:flex flex-2 max-w-[25vw] w-full h-full overflow-x-hidden overflow-y-scroll'>
            <MessageList />
          </div>

        </div>

      </div>
    </SlotContext.Provider>
  )
}

export default page