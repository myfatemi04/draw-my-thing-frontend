import React, { useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import InitializationContext from "../Initialization/InitializationContext";
import UIRow from "../ui/UIRow";
import UIText from "../ui/UIText";
import CanvasDrawingSurface from "./CanvasDrawingSurface";
import { useCurrentPlayerID, useLocalPlayerID } from "./GameHooks";

function GameInProgress() {
  const { leaveRoom } = useContext(InitializationContext);
  const currentPlayerID = useCurrentPlayerID();
  const localPlayerID = useLocalPlayerID();
  const localPlayerIsDrawing = localPlayerID == currentPlayerID;

  return (
    <View style={styles.game}>
      <UIText variant="header">Game</UIText>
      <CanvasDrawingSurface active={localPlayerIsDrawing} />
      <UIRow spacing={20} centerHorizontal>
        <Button onPress={() => leaveRoom()} title="Leave" />
      </UIRow>
    </View>
  );
}

const styles = StyleSheet.create({
  game: {
    padding: 40,
    display: "flex",
    flexDirection: "column",
  },
});

export default GameInProgress;
