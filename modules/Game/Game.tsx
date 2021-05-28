import React, {
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Canvas from "react-native-canvas";
import InitializationContext from "../Initialization/InitializationContext";
import UIText from "../ui/UIText";
import CanvasSDK from "./CanvasSDK";

export default function Game() {
  const canvas = useRef<Canvas>();
  const sdk = useMemo(() => new CanvasSDK(), []);
  const { leaveRoom } = useContext(InitializationContext);

  const [touchCounter, setTouchCounter] = useState(0);
  const [invalid, setInvalid] = useState(false);

  useLayoutEffect(() => {
    if (canvas.current) {
      sdk.setCanvas(canvas.current);
    }
  }, []);

  return (
    <View style={styles.game}>
      <UIText variant="header">Game {invalid && "invalid"}</UIText>
      <UIText variant="body">
        {touchCounter} touch{touchCounter !== 1 ? "es" : ""}
      </UIText>
      <View
        style={styles.canvas}
        onTouchStart={(event) => {
          setTouchCounter((t) => t + 1);
          const { locationX, locationY } = event.nativeEvent;
          sdk.startPath(locationX, locationY);
        }}
        onTouchMove={(event) => {
          const { locationX, locationY } = event.nativeEvent;
          sdk.moveTo(locationX, locationY);
        }}
        onTouchEnd={(event) => {
          sdk.endPath();
          setTouchCounter((t) => t - 1);
        }}
      >
        <Canvas ref={canvas} />
      </View>
      <Button onPress={leaveRoom} title="Leave" />
    </View>
  );
}

const styles = StyleSheet.create({
  game: {
    padding: 40,
  },
  canvas: {
    width: 400,
    height: 400,
    borderColor: "black",
    borderWidth: 2,
  },
});
