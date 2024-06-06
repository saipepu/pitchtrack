import React, { ReactNode } from 'react'

const layout = ({
    children
} : {
    children: ReactNode
}) => {
  return (
    <div>
        Monitor Layout
        {children}
    </div>
  )
}

export default layout