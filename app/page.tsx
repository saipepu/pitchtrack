"use client";

import Image from "next/image";
import { useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

var stompClient: any = null;
var socket = new SockJS('https://spring-boot-898-websocket.azurewebsites.net/ws');
stompClient = over(socket);

export default function Home() {

  const [connected, setConnected] = useState<Boolean>(true)

  // Socket JS Connecting
  stompClient.connect({}, () => {
    stompClient?.subscribe(`/specific/scoreBoard/teamScores/1`, function(result: any) {
      console.log("Connected")
    });
  }, (error: any) => {
    console.log(error, "Error")
  });

  return (
    <>
      <h1>Hello</h1>
      <h1 className="two-xl text-blue-200 bg-blue">Connected - {connected.toString()}</h1>
    </>
  );
}
