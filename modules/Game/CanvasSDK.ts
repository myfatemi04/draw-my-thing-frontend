import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";

type CanvasComponent = {
  type: "circle";
  radius: number;
  x: number;
  y: number;
  color: string;
};

class CanvasSDK {
  private canvas: Canvas;
  private context: CanvasRenderingContext2D;

  // Default size
  private width = 300;
  private height = 150;

  private inPath = false;

  private strokeColor = "black";

  setCanvas(canvas: Canvas) {
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = canvas.getContext("2d");
    this.context.strokeStyle = this.strokeColor;
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    if (this.canvas) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }

  setStrokeColor(color: string) {
    this.strokeColor = color;
    if (this.context) {
      this.context.strokeStyle = color;
    }
  }

  clear() {
    if (this.context) {
      this.context.clearRect(0, 0, this.width, this.height);
      this.breakPath();
    }
  }

  private breakPath() {
    if (this.context) {
      if (this.inPath) {
        this.context.closePath();
        this.context.beginPath();
      }
    }
  }

  startPath(x: number, y: number) {
    if (this.inPath) {
      console.warn(
        "Starting path while already in a path. Should never happen. Breaking previous path."
      );
      this.breakPath();
    }
    this.inPath = true;
    if (this.context) {
      this.context.beginPath();
      this.context.moveTo(x, y);
    }
  }

  moveTo(x: number, y: number) {
    if (!this.inPath) {
      console.warn(
        "Moving to location while not in path. Should never happen. Starting path."
      );
      this.startPath(x, y);
      return;
    }
    if (this.context) {
      this.context.lineTo(x, y);
      this.context.stroke();
    }
  }

  endPath() {
    if (!this.inPath) {
      console.warn(
        "Ending path while not in path. Should never happen, but this is a no-op."
      );
    } else {
      if (this.context) {
        this.context.closePath();
      }
    }
  }
}

export default CanvasSDK;
