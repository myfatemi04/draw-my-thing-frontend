import React, { useContext } from "react";
import BeforeGameLoadedScreen from "../BeforeGameLoaded/BeforeGameLoadedScreen";
import Game from "../Game/Game";
import InitializationContext from "../Initialization/InitializationContext";

export default function GameMain() {
  const { connectionStatus, currentRoomID } = useContext(InitializationContext);

  if (connectionStatus == "connected") {
    return <Game />;
  } else if (connectionStatus == null) {
    return <BeforeGameLoadedScreen />;
  }
}
