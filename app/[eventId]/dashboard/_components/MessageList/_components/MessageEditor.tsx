"use client";

import { SlotContext } from '@/app/hooks/SlotContext';
import { Textarea } from '@/components/ui/textarea'
import { ALargeSmall, ArrowBigUp, Dot, Equal, Trash } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { updateMessage } from '@/app/_api/message'
import { useParams } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { deleteMessage } from '@/app/_api/message';

enum COLORS {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
  BLACK = 'black'
}

const MessageEditor = ({ index } : any) => {

  const { eventId } = useParams();
  const { messages, setMessages } = useContext(SlotContext)
  const [message, setMessage] = useState(messages[index])
  const [textColor, setTextColor] = useState('black')

  useEffect(() => {
    setMessage(messages[index])
  }, [messages])

  const handleSave = async (onDisplay?: any) => {

    let dto = {...message, onDisplay: onDisplay} // pass by value
    delete dto._id
    const response = await updateMessage({ eventId, messageId: message._id, message: dto })
    if(response.success) {
      toast({
        title: 'Message updated'
      })
    } else {
      toast({
        title: 'Error updating message'
      })
    }

  }

  const handleDelete = async () => {

    const response = await deleteMessage({ eventId, messageId: message._id })

    if(response.success) {
      setMessages((prev: any) => {
        const updated = prev.filter((item: any, i: number) => {
          return i !== index
        })
        return updated
      })
      toast({
        title: 'Message deleted'
      })
    }

  }

  return (
    <div key={index} className={`relative w-full min-h-[100px] flex justify-start items-center rounded-lg p-2 gap-2 bg-slate-100`}>
      <div className='h-full flex justify-center items-center'>
        <Equal size={16} className="cursor-grab"/>
      </div>
      <div className='w-full h-full flex flex-col justify-start items-start gap-2'>
        <Textarea
          placeholder='Type your message here'
          value ={message.isCap ? message.desc.toUpperCase() : message.desc}
          className={`resize-none w-full h-[32px] bg-transparent placeholder:text-slate-400 ${message.bold ? 'font-bold' : ''} ${message.capitalized ? 'uppercase' : ''}`}
          style={{ color: textColor, border: 'none', background: 'white' }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage({ ...message, desc: e.target.value })}
          onBlur={() => handleSave(message.onDisplay)}
        />
        <div className='w-full flex justify-start items-center gap-2'>
          {Array.from({ length: Object.keys(COLORS).length }).map((_, j) => {
            return (
              <div
                key={j}
                className='font-serif flex flex-col justify-start items-center gap-1 cursor-pointer'
                onClick={() => setTextColor(Object.values(COLORS)[j])}
              >
                <p className='h-[20px] text-md font-bold leading-tight'
                  style={{ color: Object.values(COLORS)[j] }}
                >
                  A
                </p>
                <div className='w-full h-[2px] bg-slate-300'
                  style={
                    textColor == Object.values(COLORS)[j] ? { backgroundColor: Object.values(COLORS)[j] } : {}
                  }
                ></div>
              </div>
            )
          })}
          <div
            className='flex flex-col justify-start items-center gap-1 cursor-pointer'
            onClick={() => {
              setMessage({ ...message, isCap: !message.isCap })
            }}
          >
            <ALargeSmall size={24} className='h-[20px]' />
            <div className='w-full h-[2px] bg-slate-300'
              style={
                message.isCap ? { backgroundColor: 'black' } : {}
              }
            ></div>
          </div>
        </div>
        <div className='w-full flex justify-between items-center '>
          <div className={`cursor-pointer h-full flex justify-center items-center gap-[1px] rounded-md border-[1px] border-slate-300 p-1 ${message.onDisplay ? 'bg-slate-300' : ''}`}
            onClick={() => {
              handleSave(!message.onDisplay)
            }}
          >
            <Dot size={16} strokeWidth={8}/>
            <ArrowBigUp size={16} />
            <p className='text-md text-center'>Show</p>
          </div>
          <div className='flex items-end py-2 cursor-pointer' onClick={() => handleDelete()}>
            <Trash size={16} strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageEditor