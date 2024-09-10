"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const router = useRouter();
  const [time, setTime] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)

  // socket.on("timerUpdate", (message) => {
  //   setCurrentTime(message.remainingTime)
  // })

  useEffect(() => {
    // Redirect to dashboard
    router.push('/landing')
  }, [])

  return (
    <>
      <h1>Hello Pitchtrack Client</h1>
    </>
  );
}
