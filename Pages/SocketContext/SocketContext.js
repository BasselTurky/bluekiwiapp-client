import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import * as SecureStore from "expo-secure-store";
//TODO get client jwt from SecureStore and send it with Socket connection at auth : { token: jwt }

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const setupSocketConnection = async () => {
      const token = await SecureStore.getItemAsync("token");

      if (token) {
        const socketInstance = io("https://bluekiwiapp.com", {
          timeout: 30000,
          auth: {
            token: token,
          },
        });
        setSocket(socketInstance);
      }
    };

    setupSocketConnection();
    // console.log("socket");

    // console.log("socket 2");

    // console.log("socket 3");
    return () => {
      // console.log("socket 4");
      // socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
