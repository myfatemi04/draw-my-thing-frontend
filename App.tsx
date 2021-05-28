import React from "react";
import { StyleSheet, View } from "react-native";
import GameMain from "./modules/GameMain/GameMain";
import InitializationProvider from "./modules/Initialization/InitializationProvider";

export default function App() {
  return (
    <View style={styles.container}>
      <InitializationProvider>
        <GameMain />
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
