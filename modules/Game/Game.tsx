import React from "react";
import GameEnded from "./GameEnded";
import { useGameState } from "./GameHooks";
import GameInProgress from "./GameInProgress";
import Lobby from "./Lobby";

function Game() {
  const state = useGameState();

  console.log("Game state:", state);

  if (state === "waiting") {
    return <Lobby />;
  } else if (state === "ended") {
    return <GameEnded />;
  } else if (state === "playing") {
    return <GameInProgress />;
  }
}

export default Game;
