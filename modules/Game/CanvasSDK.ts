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
    }
  }

  startPath(x: number, y: number) {
    if (this.context) {
      this.context.beginPath();
      this.context.moveTo(x, y);
    }
  }

  moveTo(x: number, y: number) {
    if (this.context) {
      this.context.lineTo(x, y);
      this.context.stroke();
    }
  }

  endPath() {
    if (this.context) {
      this.context.closePath();
    }
  }

  addCircle(x: number, y: number, radius: number) {
    if (this.context) {
      this.context.fillRect(x, y, radius, radius);
    }
  }
}

export default CanvasSDK;
