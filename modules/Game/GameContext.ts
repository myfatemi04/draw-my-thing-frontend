import { createContext } from "react";
import GameSDK from "./GameSDK";
import GameState from "./GameState";

const GameContext = createContext({
  gameSDK: new GameSDK(),
  gameState: new GameState(),
});

export default GameContext;
