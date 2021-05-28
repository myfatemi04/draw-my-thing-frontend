import { createContext } from "react";

export type ConnectionStatus = null | "connecting" | "connected" | "errored";

export type InitializationContextProps = {
  joinRoom(roomID: string): void;
  createRoom(): void;
  leaveRoom(): void;
  cancelJoinRoom(): void;
  currentRoomID: string;
  connectionStatus: ConnectionStatus;
};

function notImplemented(name: string) {
  return () => {
    throw new Error("not implemented: " + name);
  };
}

const InitializationContext = createContext<InitializationContextProps>({
  joinRoom: notImplemented("joinRoom"),
  createRoom: notImplemented("createRoom"),
  leaveRoom: notImplemented("leaveRoom"),
  cancelJoinRoom: notImplemented("cancelJoinRoom"),
  currentRoomID: null,
  connectionStatus: null,
});

export default InitializationContext;
