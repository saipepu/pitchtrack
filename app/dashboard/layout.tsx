import React, { ReactNode } from 'react'

const layout = ({
    children
} : {
    children: ReactNode
}) => {
  return (
    <div className='w-full h-full overflow-hidden'>
        {children}
    </div>
  )
}

export default layout