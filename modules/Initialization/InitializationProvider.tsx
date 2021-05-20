import React, {
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import InitializationContext, {
  InitializationContextProps,
} from "./InitializationContext";
import socketio from "socket.io-client";
import useSocketCallback from "../hooks/useSocketCallback";

const io = socketio("localhost:6666");

export default function InitializationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentRoomID, setCurrentRoomID] = useState<string>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<null | "connecting" | "connected" | "errored">(null);
  const connectionTimeout = useRef<number>();

  const joinRoom = useCallback((roomID: string) => {
    connectionTimeout.current = setTimeout(() => {
      setConnectionStatus("errored");
    }, 6000);

    io.emit("join room", roomID);
  }, []);

  useSocketCallback(io, "joined room", (roomID) => {
    setCurrentRoomID(roomID);
    setConnectionStatus("connected");

    clearTimeout(connectionTimeout.current);
  });

  useSocketCallback(io, "left room", () => {
    setCurrentRoomID(null);
    setConnectionStatus(null);
  });

  const leaveRoom = useCallback(() => {}, []);
  const createRoom = useCallback(() => {}, []);

  const contextValue = useMemo<InitializationContextProps>(() => {
    return {
      joinRoom,
      leaveRoom,
      createRoom,
      currentRoomID,
    };
  }, []);

  return (
    <InitializationContext.Provider value={contextValue}>
      {children}
    </InitializationContext.Provider>
  );
}
