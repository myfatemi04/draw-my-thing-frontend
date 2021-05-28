import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button, StyleSheet, View, ViewProps } from "react-native";
import Canvas from "react-native-canvas";
import InitializationContext from "../Initialization/InitializationContext";
import UIRow from "../ui/UIRow";
import UIText from "../ui/UIText";
import CanvasSDK from "./CanvasSDK";
import ColorPicker, { Color } from "./ColorPicker";

export default function Game() {
  const [canvas, setCanvas] = useState<Canvas>();
  const sdk = useMemo(() => new CanvasSDK(), []);
  const { leaveRoom } = useContext(InitializationContext);

  const [touchCounter, setTouchCounter] = useState(0);
  const [touchIdentifier, setTouchIdentifier] = useState<string>(null);
  const [color, setColor] = useState<Color>("black");

  useEffect(() => {
    if (canvas) {
      sdk.setCanvas(canvas);
    }
  }, [canvas]);

  useEffect(() => {
    sdk.setStrokeColor(color);
  }, [color]);

  const onTouchStart = useCallback<ViewProps["onTouchStart"]>(
    (event) => {
      setTouchCounter((t) => t + 1);
      if (touchIdentifier == null) {
        setTouchIdentifier(event.nativeEvent.identifier);
        const { locationX, locationY } = event.nativeEvent;
        sdk.startPath(locationX, locationY);
      }
    },
    [sdk, touchIdentifier]
  );

  const onTouchMove = useCallback<ViewProps["onTouchMove"]>(
    (event) => {
      if (touchIdentifier == event.nativeEvent.identifier) {
        const { locationX, locationY } = event.nativeEvent;
        sdk.moveTo(locationX, locationY);
      }
    },
    [sdk, touchIdentifier]
  );

  const onTouchEnd = useCallback<ViewProps["onTouchEnd"]>(
    (event) => {
      if (touchIdentifier == event.nativeEvent.identifier) {
        setTouchIdentifier(null);
        sdk.endPath();
      }
      setTouchCounter((t) => t - 1);
    },
    [sdk, touchIdentifier]
  );

  const clear = useCallback(() => {
    sdk.clear();
    // TODO add code that sends 'clear' command to server
  }, [sdk]);

  return (
    <View style={styles.game}>
      <UIText variant="header">Game</UIText>
      <UIText variant="body">
        {touchCounter} touch{touchCounter !== 1 ? "es" : ""}.{" "}
        {touchIdentifier && `Active ID: ${touchIdentifier}`}
      </UIText>
      <View
        onLayout={({ nativeEvent }) => {
          const { width, height } = nativeEvent.layout;
          sdk.setSize(width, height);
        }}
        style={styles.canvas}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Canvas
          ref={(canvas) => setCanvas(canvas)}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <UIRow spacing={20} centerHorizontal>
        <Button onPress={() => leaveRoom()} title="Leave" />
        <Button onPress={() => clear()} title="Clear" />
      </UIRow>
      <ColorPicker color={color} onPickedColor={(color) => setColor(color)} />
    </View>
  );
}

const styles = StyleSheet.create({
  game: {
    padding: 40,
    display: "flex",
    flexDirection: "column",
  },
  canvas: {
    width: 400,
    height: 400,
    borderColor: "black",
    borderWidth: 2,
  },
});
