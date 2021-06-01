import React from "react";
import { StyleSheet, Text } from "react-native";
import { useConnectionState } from "../Game/GameHooks";

export default function ConnectionStatusIndicator() {
  const connectionState = useConnectionState();

  return (
    <Text style={styles.baseText}>
      Connection status: {connectionState ?? "none"}
    </Text>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: 10,
    marginBottom: 20,
  },
});
