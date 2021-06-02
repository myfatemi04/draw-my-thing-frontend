import React, { useContext } from "react";
import { Button } from "react-native";
import GameContext from "./GameContext";

function LeaveGameButton() {
  const { gameController } = useContext(GameContext);
  return <Button onPress={() => gameController.disconnect()} title="Leave" />;
}

export default LeaveGameButton;
