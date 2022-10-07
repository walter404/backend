import { useState, useEffect } from 'react';
import SocketConfig from '../config/SocketConfig';

function useSocket({room, body, listen,  onSuccess }) {
  const [received, setReceived ] = useState([])
  const [lastPong, setLastPong] = useState(null);
  const socket =  SocketConfig;
  const [isConnected, setIsConnected] = useState(socket.connected);
  const doRequest = () =>{
    socket.emit(room, {
      body
    })
    if (onSuccess) {
      onSuccess(body);
    }
  }

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on(listen, (data) => {
      setReceived([...received, data])
    })
    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);
  return  { doRequest, isConnected, lastPong , received};
}

export default useSocket;
