import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import BeforeGameLoadedScreen from "../BeforeGameLoaded/BeforeGameLoadedScreen";
import Game from "../Game/Game";
import InitializationContext from "../Initialization/InitializationContext";

export default function GameMain() {
  const { connectionStatus, currentRoomID } = useContext(InitializationContext);

  // return (
  //   <View style={styles.baseView}>
  //     <Text style={styles.baseText}>Connection status: {connectionStatus}</Text>
  //   </View>
  // );

  if (connectionStatus == "connected") {
    return <Game />;
  } else {
    return <BeforeGameLoadedScreen />;
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: 10,
  },
  baseView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
