import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

//TODO get client jwt from SecureStore and send it with Socket connection at auth : { token: jwt }
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // console.log("socket");
    const socketInstance = io("https://bluekiwiapp.com", {
      timeout: 30000,
      auth: {
        token: "token",
      },
    });
    // console.log("socket 2");
    setSocket(socketInstance);
    // console.log("socket 3");
    return () => {
      // console.log("socket 4");
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
