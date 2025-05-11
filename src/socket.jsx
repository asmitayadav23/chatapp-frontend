import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server } from "./constants/config"; // should point to Render backend URL

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () =>
      io(server, {
        withCredentials: true,
        transports: ["websocket", "polling"], // ✅ recommended
      }),
    []
  );

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };
