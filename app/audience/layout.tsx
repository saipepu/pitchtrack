import React, { ReactNode } from 'react'

const layout = ({
    children
} : {
    children: ReactNode
}) => {
  return (
    <div>
        Audience Layout
        {children}
    </div>
  )
}

export default layout