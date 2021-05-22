import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";

type CanvasComponent = {
  type: "circle";
  radius: number;
  x: number;
  y: number;
  color: string;
};

class CanvasSDK {
  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(canvas: Canvas) {
    this.context = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
  }

  setColor(color: string) {
    this.context.fillStyle = color;
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  addCircle(x: number, y: number, radius: number) {
    this.context.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2, false);
  }
}

export default CanvasSDK;
