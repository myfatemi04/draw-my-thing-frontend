import React from "react";
import { StyleSheet, View } from "react-native";
import UIText from "../ui/UIText";
import CanvasDrawingSurface from "./CanvasDrawingSurface";
import { useCurrentPlayerID, useLocalPlayerID } from "./GameHooks";

function GameInProgress() {
  const currentPlayerID = useCurrentPlayerID();
  const localPlayerID = useLocalPlayerID();
  const localPlayerIsDrawing = localPlayerID == currentPlayerID;

  return (
    <View style={styles.game}>
      <UIText variant="header">Game</UIText>
      <CanvasDrawingSurface active={localPlayerIsDrawing} />
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
