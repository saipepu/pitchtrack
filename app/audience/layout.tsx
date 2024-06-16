import React, { ReactNode } from 'react'

const layout = ({
    children
} : {
    children: ReactNode
}) => {
  return (
    <div className='w-full min-h-full flex flex-col'>
      {children}
    </div>
  )
}

export default layout