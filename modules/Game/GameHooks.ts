import { useContext } from "react";
import GameContext from "./GameContext";

export function useGameState() {
  return useContext(GameContext).gameState.state;
}

export function useCurrentPlayerID() {
  return useContext(GameContext).gameState.currentQuestionPlayerID;
}

export function useLocalPlayerID() {
  return useContext(GameContext).gameState.localUserID;
}
