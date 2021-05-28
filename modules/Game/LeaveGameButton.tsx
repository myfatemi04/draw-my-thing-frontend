import React, { useContext } from "react";
import { Button } from "react-native";
import InitializationContext from "../Initialization/InitializationContext";

function LeaveGameButton() {
  const { leaveRoom } = useContext(InitializationContext);
  return <Button onPress={() => leaveRoom()} title="Leave" />;
}

export default LeaveGameButton;
