import { createContext } from "react";
import CanvasSDK from "./CanvasSDK";

export type GameContextProps = {
  canvasSDK: CanvasSDK;
};

const CanvasContext = createContext<GameContextProps>({
  canvasSDK: new CanvasSDK(null),
});

export default CanvasContext;
