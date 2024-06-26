"use client";

import React, { ReactNode, createContext, useState } from 'react'
import slotList from '@/utils/dummy-data/slots'

export const SlotContext = createContext<any>(null)

const layout = ({
    children
} : {
    children: ReactNode
}) => {

  const [slots, setSlots] = useState(slotList)
  console.log(slots)

  return (
    <>
      <SlotContext.Provider value={{slots, setSlots}}>
        <div className='w-full h-full overflow-hidden'>
          {children}
        </div>
      </SlotContext.Provider>
    </>
  )
}

export default layout