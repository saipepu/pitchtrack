import React from 'react'
import SortableList from '../SortableList'

const page = () => {

  // show the list of messages
  return (
    <div className='w-full h-full flex flex-col justify-start items-start gap-4 border-l-[1px] border-slate-100 p-2'>

      {/* Header */}
      <div className='w-full h-[30px] flex justify-between items-center gap-2'>
        <div className='w-full h-full flex justify-start items-center'>
          <p className='text-md font-medium text-center'>Messages</p>
        </div>
      </div>

      {/* Message List */}
      <div className='w-full h-full flex flex-col justify-start items-start gap-2 pb-[100px] md:pb-0'>

        {/* SortableList */}
        <SortableList tag={"message"}/>

      </div>


    </div>
  )
}

export default page