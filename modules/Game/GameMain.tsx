import React, { useContext } from "react";
import BeforeGameLoadedScreen from "../BeforeGameLoaded/BeforeGameLoadedScreen";
import Game from "./Game";
import GameProvider from "./GameProvider";
import InitializationContext from "../Initialization/InitializationContext";

export default function GameMain() {
  const { connectionStatus } = useContext(InitializationContext);

  if (connectionStatus == "connected") {
    return (
      <GameProvider>
        <Game />
      </GameProvider>
    );
  } else {
    return <BeforeGameLoadedScreen />;
  }
}
