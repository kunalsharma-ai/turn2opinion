"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // connect socket when client loads
// /*
const s = io("https://mho.sampledge.duckdns.org", {
    // const s = io("http://chat.localhost", {
      //*/ const s = io("https://chat.sampledge.com", {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000,
    path: "/chat"
  });

    setSocket(s);

    // clean up
    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={ socket }>
      { children }
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
