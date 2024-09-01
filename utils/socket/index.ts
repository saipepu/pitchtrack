import { socketApi } from "@/app/_api/api";
import { io } from "socket.io-client";

const socket = io(socketApi, {
  transports: ['websocket'],
});
socket.on('connect', () => {
  console.log('socket connected');
})

export default socket;