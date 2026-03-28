import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

/**
 * useSocket Hook
 * Manages a Socket.io connection with JWT handshake.
 */
const useSocket = (url) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) return;

    // Initialize socket with auth handshake
    socketRef.current = io(url || 'http://localhost:5000', {
      auth: { token },
      transports: ['websocket'], // Force websocket for performance
      reconnectionAttempts: 5,
    });

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      console.log('Socket Connected:', socketRef.current.id);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket Disconnected');
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Socket Connection Error:', err.message);
      setIsConnected(false);
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [url]);

  return { socket: socketRef.current, isConnected };
};

export default useSocket;
