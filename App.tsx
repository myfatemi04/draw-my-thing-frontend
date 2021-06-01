import React from "react";
import { StyleSheet, View } from "react-native";
import GameConnectionStateSwitch from "./modules/Game/GameConnectionStateSwitch";
import GameProvider from "./modules/Game/GameProvider";

export default function App() {
  return (
    <View style={styles.container}>
      <GameProvider>
        <GameConnectionStateSwitch />
      </GameProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 40,
  },
});
