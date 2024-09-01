"use client";

import { useEffect, useState } from "react";
import socket from "@/utils/socket/index";
import { EmitSocket } from "@/utils/socket/SocketEmit";

export default function Home() {

  const [time, setTime] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)

  // socket.on("timerUpdate", (message) => {
  //   setCurrentTime(message.remainingTime)
  // })

  useEffect(() => {
    // Redirect to /dashboard
    // router.push('/1/dashboard')
  }, [])

  const startHandler = () => {
    EmitSocket('start', {
      duration: time
    })
  }

  const resumeHandler = () => {
    EmitSocket('resume')
  }

  const pauseHandler = () => {
    EmitSocket('pause')
  }

  return (
    <>
      <h1>Hello</h1>
      <h1 className="two-xl text-blue-200 bg-blue">Timer - {currentTime}</h1>
      <input type="number" placeholder="input time" onChange={(e) => setTime(parseInt(e.target.value))} />
      <button onClick={() => startHandler()}>START</button>
      <button onClick={() => resumeHandler()}>RESUME</button>
      <button onClick={() => pauseHandler()}>PAUSE</button>
    </>
  );
}
