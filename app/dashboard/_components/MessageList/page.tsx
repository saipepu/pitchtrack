import { Textarea } from '@/components/ui/textarea'
import { ALargeSmall, ArrowBigUp, Dot, Equal, Plus, Trash } from 'lucide-react'
import React from 'react'
import { FiPlus } from 'react-icons/fi'
import MessageEditor from './_components/MessageEditor'
import MessageSortableList from './_components/MessageSortableList'

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
        {/* {message?.map((message, i) => {
          return (
            <MessageEditor key={i} message={message} setMessage={setMessage} i={i}/>
          )
        })} */}
        <MessageSortableList />
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