import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import BeforeGameLoadedScreen from "./modules/BeforeGameLoaded/BeforeGameLoadedScreen";

export default function App() {
  const [gameID, setGameID] = useState<string>();

  return (
    <View style={styles.container}>
      {gameID == null && <BeforeGameLoadedScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
