import React, { useLayoutEffect, useMemo, useRef } from "react";
import { View, StyleSheet } from "react-native";
import Canvas from "react-native-canvas";
import CanvasSDK from "./CanvasSDK";

export default function Game() {
  const canvas = useRef<Canvas>();
  const sdk = useMemo(() => new CanvasSDK(), []);

  useLayoutEffect(() => {
    if (canvas.current) {
      sdk.setNativeCanvas(canvas.current.getContext("2d"));
    }
  }, []);

  return (
    <View style={styles.game}>
      <Canvas ref={canvas} />
    </View>
  );
}

const styles = StyleSheet.create({
  game: {
    padding: "2rem",
  },
});
