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
import * as socketio from "socket.io-client";
import useSocketCallback from "../hooks/useSocketCallback";

const io = socketio.io("http://localhost:7000/");

export default function InitializationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentRoomID, setCurrentRoomID] = useState<string>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<null | "connecting" | "connected" | "errored">(null);
  const connectionTimeout = useRef<NodeJS.Timeout>();

  const joinRoom = useCallback((roomID: string) => {
    setConnectionStatus("connecting");

    setTimeout(() => {
      setConnectionStatus("connected");
    }, 1000);

    setCurrentRoomID(roomID);

    io.emit("join room", roomID);
  }, []);

  const cancelJoinRoom = useCallback(() => {
    setConnectionStatus(null);
    setCurrentRoomID(null);
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

  const leaveRoom = useCallback(() => {
    setCurrentRoomID(null);
    setConnectionStatus(null);
  }, []);
  const createRoom = useCallback(() => {}, []);

  const contextValue = useMemo<InitializationContextProps>(() => {
    return {
      joinRoom,
      leaveRoom,
      createRoom,
      cancelJoinRoom,
      currentRoomID,
      connectionStatus,
    };
  }, [joinRoom, leaveRoom, createRoom, currentRoomID, connectionStatus]);

  return (
    <InitializationContext.Provider value={contextValue}>
      {children}
    </InitializationContext.Provider>
  );
}