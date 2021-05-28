import React, { useContext } from "react";
import BeforeGameLoadedScreen from "../BeforeGameLoaded/BeforeGameLoadedScreen";
import Game from "../Game/Game";
import InitializationContext from "../Initialization/InitializationContext";

export default function GameMain() {
  const { connectionStatus } = useContext(InitializationContext);

  if (connectionStatus == "connected") {
    return <Game />;
  } else {
    return <BeforeGameLoadedScreen />;
  }
}
