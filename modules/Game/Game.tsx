import React from "react";
import { View } from "react-native";
import GameEnded from "./GameEnded";
import { useGameState } from "./GameHooks";
import GameInProgress from "./GameInProgress";
import LeaveGameButton from "./LeaveGameButton";
import Lobby from "./Lobby";

function Game() {
  const state = useGameState();

  let contentView: JSX.Element;

  if (state === "waiting") {
    contentView = <Lobby />;
  } else if (state === "ended") {
    contentView = <GameEnded />;
  } else if (state === "playing") {
    contentView = <GameInProgress />;
  }

  return (
    <View>
      {contentView}
      <LeaveGameButton />
    </View>
  );
}

export default Game;
