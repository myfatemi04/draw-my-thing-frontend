import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import BeforeGameLoadedScreen from "./modules/BeforeGameLoaded/BeforeGameLoadedScreen";
import InitializationProvider from "./modules/Initialization/InitializationProvider";

export default function App() {
  const [gameID, setGameID] = useState<string>();

  return (
    <View style={styles.container}>
      <InitializationProvider>
        {gameID == null && <BeforeGameLoadedScreen />}
      </InitializationProvider>
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
