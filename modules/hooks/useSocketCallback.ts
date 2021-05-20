import { useEffect } from "react";
import { Socket } from "socket.io-client";

export default function useSocketCallback(
  io: Socket,
  event: string,
  cb: (...args: any[]) => void
) {
  useEffect(() => {
    io.on(event, cb);

    return () => {
      io.off(event, cb);
    };
  }, [io, cb]);
}
