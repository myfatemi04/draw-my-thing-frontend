import React from "react";
import BeforeGameLoadedScreen from "../BeforeGameLoaded/BeforeGameLoadedScreen";
import Game from "./Game";
import { useConnectionState } from "./GameHooks";

function GameConnectionStateSwitch() {
  const state = useConnectionState();
  switch (state) {
    case null:
    case "connecting":
    case "errored":
      return <BeforeGameLoadedScreen />;

    case "connected":
      return <Game />;
  }
}

export default GameConnectionStateSwitch;
