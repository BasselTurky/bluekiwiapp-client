import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import * as SecureStore from "expo-secure-store";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const setupSocketConnection = async () => {
      const accessToken = await SecureStore.getItemAsync("accessToken");

      if (token) {
        const socketInstance = io("https://bluekiwiapp.com", {
          timeout: 30000,
          auth: {
            accessToken: accessToken,
          },
        });

        setSocket(socketInstance);
      }
    };

    setupSocketConnection();

    return () => {
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
