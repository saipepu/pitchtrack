import { Textarea } from '@/components/ui/textarea'
import { ALargeSmall, ArrowBigUp, Dot, Equal, Plus, Trash } from 'lucide-react'
import React from 'react'
import { FiPlus } from 'react-icons/fi'

const page = () => {

  enum COLORS {
    RED = 'red',
    GREEN = 'green',
    BLUE = 'blue',
    BLACK = 'black'
  }

  let messageList = [
    { 
      message: 'Hello, how are you?',
      color: COLORS.BLUE,
      bold: true,
      capitalized: true,
    },
    { 
      message: 'I am fine, thank you.',
      color: COLORS.GREEN,
      bold: false,
      capitalized: false,
    },
    { 
      message: 'What are you doing?',
      color: COLORS.BLACK,
      bold: true,
      capitalized: true,
    },
    { 
      message: 'I am working on a project.',
      color: COLORS.RED,
      bold: false,
      capitalized: false,
    },
    { 
      message: 'I am working on a project.',
      color: COLORS.RED,
      bold: false,
      capitalized: false,
    },
    { 
      message: 'I am working on a project.',
      color: COLORS.RED,
      bold: false,
      capitalized: false,
    },
    { 
      message: 'I am working on a project.',
      color: COLORS.RED,
      bold: false,
      capitalized: false,
    },
    { 
      message: 'I am working on a project.',
      color: COLORS.RED,
      bold: false,
      capitalized: false,
    },
  ]

  const [message, setMessage] = React.useState(messageList)

  // show the list of messages
  return (
    <div className='w-full h-full flex flex-col justify-start items-start border-l-[1px] border-slate-100 p-2'>

      {/* Header */}
      <div className='w-full h-[30px] flex justify-between items-center gap-2'>
        <div className='w-full h-full flex justify-start items-center'>
          <p className='text-md font-medium text-center'>Messages</p>
        </div>
      </div>

      {/* Message List */}
      <div className='w-full flex flex-col justify-start items-start gap-2 pb-[100px]'>
        {message?.map((message, i) => {
          return (
            <div key={i} className={`relative w-full min-h-[100px] flex justify-start items-center rounded-lg p-2 gap-2 bg-slate-100`}>
              <div className='h-full flex justify-center items-center'>
                <Equal size={16} className="cursor-grab"/>
              </div>
              <div className='w-full h-full flex flex-col justify-start items-start gap-2'>
                <Textarea
                  placeholder='Type your message here'
                  defaultValue={message.message}
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
        })}
        <div className='w-full flex justify-center items-center'>
          <div
            onClick={() => {
              setMessage([
                ...message,
                {
                  message: '',
                  color: COLORS.BLACK,
                  bold: false,
                  capitalized: false,
                }
              ])
            }}
            className="cursor-pointer flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:text-slate-500"
          >
              <span>Add Message</span>
              <FiPlus />
          </div>
        </div>
      </div>


    </div>
  )
}

export default page