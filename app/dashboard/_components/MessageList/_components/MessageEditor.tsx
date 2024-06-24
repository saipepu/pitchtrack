"use client";

import { Textarea } from '@/components/ui/textarea'
import { ALargeSmall, ArrowBigUp, Dot, Equal, Trash } from 'lucide-react'
import React, { useEffect } from 'react'

const MessageEditor = ({ message, i, setMessage} : any) => {

  enum COLORS {
    RED = 'red',
    GREEN = 'green',
    BLUE = 'blue',
    BLACK = 'black'
  }
  const [defaultMessage, setDefaultMessage] = React.useState<string>();

  useEffect(() => {
    setDefaultMessage(message.message)
  }, [message])

  return (
    <div key={i} className={`relative w-full min-h-[100px] flex justify-start items-center rounded-lg p-2 gap-2 bg-slate-100`}>
      <div className='h-full flex justify-center items-center'>
        <Equal size={16} className="cursor-grab"/>
      </div>
      <div className='w-full h-full flex flex-col justify-start items-start gap-2'>
        <Textarea
          placeholder='Type your message here'
          defaultValue={defaultMessage}
          className={`resize-none w-full h-[32px] bg-transparent ${message.bold ? 'font-bold' : ''} ${message.capitalized ? 'uppercase' : ''}`}
          style={{ color: message.color, border: 'none', background: 'white' }}
        />
        <div className='w-full flex justify-start items-center gap-2'>
          {Array.from({ length: Object.keys(COLORS).length }).map((_, i) => {
            return (
              <div key={i} className='font-serif flex flex-col justify-start items-center gap-1 cursor-pointer'>
                <p className='h-[20px] text-md font-bold leading-tight'
                  style={{ color: Object.values(COLORS)[i] }}
                >
                  A
                </p>
                <div className='w-full h-[2px] bg-slate-300'
                  style={
                    message.color == Object.values(COLORS)[i] ? { backgroundColor: Object.values(COLORS)[i] } : {}
                  }
                ></div>
              </div>
            )
          })}
          <div className='flex flex-col justify-start items-center gap-1 cursor-pointer'>
            <ALargeSmall size={24} className='h-[20px]' />
            <div className='w-full h-[2px] bg-slate-300'
              style={
                message.capitalized ? { backgroundColor: Object.values(COLORS)[i] } : {}
              }
            ></div>
          </div>
        </div>
        <div className='w-full flex justify-between items-center '>
          <div className='cursor-pointer h-full flex justify-center items-center gap-[1px] rounded-md border-[1px] border-slate-300 p-1'>
            <Dot size={16} strokeWidth={8}/>
            <ArrowBigUp size={16} />
            <p className='text-md text-center'>Show</p>
          </div>
          <div className='flex items-end py-2 cursor-pointer'>
            <Trash size={16} strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageEditor