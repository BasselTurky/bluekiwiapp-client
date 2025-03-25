import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import * as SecureStore from "expo-secure-store";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const setupSocketConnection = async () => {
      console.log("socket test");

      const accessToken = await SecureStore.getItemAsync("accessToken");
      console.log("access Token sent to socket connection:", accessToken);

      if (accessToken) {
        const socketInstance = io("https://bluekiwiapp.com", {
          timeout: 30000,
          auth: {
            accessToken: accessToken,
          },
        });
        if (socketInstance) {
          console.log("socketInstance");
        }

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
