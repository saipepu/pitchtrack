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
import messageList from '@/utils/dummy-data/messages'
import { SlotContext } from './hook'

const page = () => {

  const [isRoomNameChanging, setIsRoomNameChanging] = useState(false)
  const [roomName, setRoomName] = React.useState('Unnamed')
  const [position, setPosition] = React.useState("bottom")

  const [slots, setSlots] = useState(slotList)
  const [messages, setMessages] = useState(messageList)

  console.log(slots)

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
    <SlotContext.Provider value={{slots, setSlots, messages, setMessages}}>
      <div className='w-full h-full flex flex-col justify-start items-start overflow-y-scroll md:overflow-y-hidden'>

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
          <div className='w-1/2 h-10 flex justify-end items-center px-2'>
            <DropDown />
            <div className='cursor-pointer text-sm font-medium'>
              Sign In
            </div>
          </div>
        </div>

        <div className='w-full md:max-h-full bg-white flex flex-col lg:flex-row justify-start items-start gap-5 md:gap-0 md:overflow-y-hidden'>

          {/* Sidebar */}
          <div className='flex md:flex-2 md:w-[35vw] md:min-w-[300px] w-full md:h-full md:overflow-y-scroll'>
            <Sidebar />
          </div>

          {/* Timer Preset */}
          <div className='md:flex-4 w-full md:h-full'>
            <TimerPreset />
          </div>

          {/* Message List */}
          <div className='lg:flex flex md:flex-2 w-full md:max-w-[25vw] overflow-x-hidden md:overflow-y-scroll'>
            <MessageList />
          </div>

        </div>

      </div>
    </SlotContext.Provider>
  )
}

export default page