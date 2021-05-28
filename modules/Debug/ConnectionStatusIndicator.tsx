import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import InitializationContext from "../Initialization/InitializationContext";

export default function ConnectionStatusIndicator() {
  const { connectionStatus } = useContext(InitializationContext);

  return (
    <Text style={styles.baseText}>
      Connection status: {connectionStatus ?? "none"}
    </Text>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: 10,
    marginBottom: 20,
  },
});
