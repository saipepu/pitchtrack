"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client'

enum ACTION {
  PAUSE = "PAUSE",
  RESUME = "RESUME"
}

interface Timer {
  stoppedTime: number;
  action: ACTION
}
// const socket = io('http://localhost:8080');
// socket.on('connect', () => {
// })

export default function Home() {

  const router = useRouter();
  const [message, setMessage] = useState<string>('')
  const [time, setTime] = useState<number>(0)
  const [startTime, setStartTime] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [paused, setPaused] = useState<boolean>(false)
  const [resumed, setResumed] = useState<boolean>(true)
  const intervalRef = useRef<number | null>(null);

  // socket.on("message", (message) => {
  //   setMessage(message)
  // })

  // socket.on("resume", (message) => {
  //   setStartTime(currentTime);
  //   setResumed(true)
  // })

  // socket.on("pause", (message) => {
  //   console.log('PAUSED')
  //   setResumed(false)
  // })

  // const EmitSocket = (path: string, payload: Timer) => {
  //   console.log('Emitting', path, payload)
  //   socket.emit(path, payload);
  // }

  useEffect(() => {
    if (!resumed) {
      console.log('paused', !resumed)
        clearInterval(intervalRef.current as number);
    } else {
        startTimerInterval();
    }
  }, [resumed]);

  const startTimerInterval = () => {
      const sT = startTime || 0;
      clearInterval(intervalRef.current as number);
      intervalRef.current = window.setInterval(() => {
          // let c = Math.floor((Date.now() - sT) / 1000);
          setCurrentTime((prev) => prev + 1);
      }, 1000);
  };

  useEffect(() => {
    // Redirect to /dashboard
    router.push('/1/dashboard')
  }, [])

  return (
    <>
      {/* <h1>Hello</h1>
      <h1 className="two-xl text-blue-200 bg-blue">Timer - {currentTime}</h1>
      <input type="number" onChange={(e) => setTime(parseInt(e.target.value))} />
      <button onClick={() => EmitSocket('resume', {
        stoppedTime: currentTime,
        action: ACTION.RESUME
      })}>RESUME</button>
      <button onClick={() => EmitSocket('pause', {
        stoppedTime: currentTime,
        action: ACTION.PAUSE
      })}>PAUSE</button> */}
    </>
  );
}
