import { io as connect, Socket } from "socket.io-client";
import CanvasSDK from "./CanvasSDK";
import { Color } from "./ColorPicker";

/**
 * This controls the GameSDK based on what it receives from a socket connection
 */
class GameController {
  private io: Socket;
  private canvasSDK: CanvasSDK;

  constructor(url: string) {
    this.io = connect(url);
    this.io.on("path-started", (x, y) => {
      this.canvasSDK.startPath(x, y);
    });

    this.io.on("path-moved", (x, y) => {
      this.canvasSDK.moveTo(x, y);
    });

    this.io.on("path-ended", () => {
      this.canvasSDK.endPath();
    });
  }

  setCanvasSDK(canvasSDK: CanvasSDK) {
    this.canvasSDK = canvasSDK;
  }

  private emit(event: string, ...args: any[]) {
    if (!this.io) {
      console.warn("Game controller: io is null");
    } else {
      this.io.emit(event, ...args);
    }
  }

  sendPathStart(x: number, y: number) {
    this.emit("path-start", x, y);
  }

  sendPathMove(x: number, y: number) {
    this.emit("path-move", x, y);
  }

  sendPathEnd() {
    this.emit("path-end");
  }

  sendColorChange(color: Color) {
    this.emit("set-color", color);
  }

  sendCanvasClear() {
    this.emit("clear-canvas");
  }

  sendChatMessage(content: string) {
    this.emit("send-chat-message", content);
  }
}

export default GameController;
