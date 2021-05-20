import { createContext } from "react";

export type InitializationContextProps = {
  joinRoom(roomID: string): void;
  createRoom(): void;
  leaveRoom(): void;
  currentRoomID: string;
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
  currentRoomID: null,
});

export default InitializationContext;
