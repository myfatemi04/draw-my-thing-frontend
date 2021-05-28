import { createContext } from "react";
import CanvasSDK from "./CanvasSDK";
import GameController from "./GameController";
import GameSDK from "./GameSDK";
import GameState from "./GameState";

const GameContext = createContext({
  gameController: new GameController(),
  gameSDK: new GameSDK(),
  gameState: new GameState(),
  canvasSDK: new CanvasSDK(),
});

export default GameContext;
