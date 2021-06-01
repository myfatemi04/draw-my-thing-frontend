import { useContext } from "react";
import GameContext from "./GameContext";

function use_() {
  return useContext(GameContext).gameState;
}

export function useGameState() {
  return use_().state;
}

export function useConnectionState() {
  return use_().gameConnectionState;
}

export function useCurrentPlayerID() {
  return use_().currentQuestionPlayerID;
}

export function useLocalPlayerID() {
  return use_().localUserID;
}

export function usePlayers() {
  return use_().players;
}
