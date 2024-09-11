"use client"
import socket from '@/utils/socket';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const { eventId } = useParams();

  useEffect(() => {
    if(eventId) {
      socket.emit('joinRoom', { eventId })
    }
  }, [])

  return (
    <>
    {children}
    </>
  )
}

export default layout