import { over } from 'stompjs'
import SockJS from 'sockjs-client';
// ws connection establishing
var stompClient: any = null;
var socket = new SockJS('https://spring-boot-898-websocket.azurewebsites.net/ws');

const ConnectSocket = () => {
  stompClient = over(socket);

  console.log("WS:--Connecting")
  stompClient.connect({}, () => {  
    console.log("WS:--Connected")
  }, (error: any) => {
    console.log(error, 'WS:--Error')
    setTimeout(ConnectSocket(), 5000)
  });
  return stompClient
}
ConnectSocket()

export default stompClient