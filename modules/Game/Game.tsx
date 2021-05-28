import React, {
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, View, Text, Button, Dimensions } from "react-native";
import Canvas from "react-native-canvas";
import InitializationContext from "../Initialization/InitializationContext";
import UIRow from "../ui/UIRow";
import UIText from "../ui/UIText";
import CanvasSDK from "./CanvasSDK";

export default function Game() {
  const canvas = useRef<Canvas>();
  const sdk = useMemo(() => new CanvasSDK(), []);
  const { leaveRoom } = useContext(InitializationContext);

  const [touchCounter, setTouchCounter] = useState(0);
  const [touchIdentifier, setTouchIdentifier] = useState<string>(null);

  useLayoutEffect(() => {
    if (canvas.current) {
      sdk.setCanvas(canvas.current);
    }
  }, []);

  return (
    <View style={styles.game}>
      <UIText variant="header">Game</UIText>
      <UIText variant="body">
        {touchCounter} touch{touchCounter !== 1 ? "es" : ""}.{" "}
        {touchIdentifier && `Active ID: ${touchIdentifier}`}
      </UIText>
      <View
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;

          sdk.setSize(width, height);
        }}
        style={styles.canvas}
        onTouchStart={(event) => {
          setTouchCounter((t) => t + 1);
          if (touchIdentifier == null) {
            setTouchIdentifier(event.nativeEvent.identifier);
            const { locationX, locationY } = event.nativeEvent;
            sdk.startPath(locationX, locationY);
          }
        }}
        onTouchMove={(event) => {
          if (touchIdentifier == event.nativeEvent.identifier) {
            const { locationX, locationY } = event.nativeEvent;
            sdk.moveTo(locationX, locationY);
          }
        }}
        onTouchEnd={(event) => {
          if (touchIdentifier == event.nativeEvent.identifier) {
            setTouchIdentifier(null);
            sdk.endPath();
          }
          setTouchCounter((t) => t - 1);
        }}
      >
        <Canvas
          ref={canvas}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <UIRow spacing={20} centerHorizontal>
        <Button onPress={() => leaveRoom()} title="Leave" />
        <Button onPress={() => sdk.clear()} title="Clear" />
      </UIRow>
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
