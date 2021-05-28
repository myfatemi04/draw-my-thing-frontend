import { Dispatch, SetStateAction } from "react";
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

  setCanvas(canvas: Canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    canvas.width = this.width;
    canvas.height = this.height;
    this.setColor("black");
    this.context.fillRect(0, 0, 50, 50);
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    console.log("[canvas size]", `${this.width} x ${this.height}`);
  }

  setColor(color: string) {
    this.context.fillStyle = color;
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
