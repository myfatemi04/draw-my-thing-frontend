import { createContext } from "react";
import GameSDK from "./GameSDK";

const GameContext = createContext({
  gameSDK: new GameSDK(),
});

export default GameContext;
