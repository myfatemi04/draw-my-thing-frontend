import React from "react";
import { StyleSheet, View } from "react-native";
import Game from "./modules/Game/Game";
import GameProvider from "./modules/Game/GameProvider";

export default function App() {
  return (
    <View style={styles.container}>
      <GameProvider>
        <Game />
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
