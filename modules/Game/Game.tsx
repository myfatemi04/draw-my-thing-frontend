import React from "react";
import { StyleSheet } from "react-native";
import GameEnded from "./GameEnded";
import { useGameState } from "./GameHooks";
import GameInProgress from "./GameInProgress";
import Lobby from "./Lobby";

function Game() {
  const state = useGameState();

  if (state === "waiting") {
    return <Lobby />;
  } else if (state === "ended") {
    return <GameEnded />;
  } else if (state === "playing") {
    return <GameInProgress />;
  }
}

export default Game;
