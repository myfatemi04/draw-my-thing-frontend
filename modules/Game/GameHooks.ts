import { useContext } from "react";
import GameContext from "./GameContext";

export function useGameState() {
  return useContext(GameContext).gameState.state;
}
