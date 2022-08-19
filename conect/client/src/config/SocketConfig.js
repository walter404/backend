import { io } from "socket.io-client";
const URL = "http://localhost:4000"; // backend port is 3010
const socket = io(URL, { autoConnect: true, multiplex:false });


socket.onAny((eventName, ...args) => {
  console.log(eventName, args);
});

export default socket;