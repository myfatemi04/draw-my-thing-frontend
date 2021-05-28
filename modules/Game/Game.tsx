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
import GameContext from "./GameContext";

export default function Game() {
  const [canvas, setCanvas] = useState<Canvas>();
  const canvasSDK = useMemo(() => new CanvasSDK(), []);
  const { gameSDK } = useContext(GameContext);
  const { leaveRoom } = useContext(InitializationContext);

  const [touchCounter, setTouchCounter] = useState(0);
  const [touchIdentifier, setTouchIdentifier] = useState<string>(null);
  const [color, setColor] = useState<Color>("black");

  useEffect(() => {
    if (canvas) {
      canvasSDK.setCanvas(canvas);
    }
  }, [canvasSDK, canvas]);

  useEffect(() => {
    canvasSDK.setStrokeColor(color);
    gameSDK.sendColorChange(color);
  }, [canvasSDK, gameSDK, color]);

  const onTouchStart = useCallback<ViewProps["onTouchStart"]>(
    (event) => {
      setTouchCounter((t) => t + 1);
      if (touchIdentifier == null) {
        setTouchIdentifier(event.nativeEvent.identifier);
        const { locationX: x, locationY: y } = event.nativeEvent;
        canvasSDK.startPath(x, y);
        gameSDK.sendPathStart(x, y);
      }
    },
    [canvasSDK, gameSDK, touchIdentifier]
  );

  const onTouchMove = useCallback<ViewProps["onTouchMove"]>(
    (event) => {
      if (touchIdentifier == event.nativeEvent.identifier) {
        const { locationX: x, locationY: y } = event.nativeEvent;
        canvasSDK.moveTo(x, y);
        gameSDK.sendPathMove(x, y);
      }
    },
    [canvasSDK, gameSDK, touchIdentifier]
  );

  const onTouchEnd = useCallback<ViewProps["onTouchEnd"]>(
    (event) => {
      if (touchIdentifier == event.nativeEvent.identifier) {
        setTouchIdentifier(null);
        canvasSDK.endPath();
        gameSDK.sendPathEnd();
      }
      setTouchCounter((t) => t - 1);
    },
    [canvasSDK, gameSDK, touchIdentifier]
  );

  const clear = useCallback(() => {
    canvasSDK.clear();
    gameSDK.sendCanvasClear();
  }, [canvasSDK]);

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
          canvasSDK.setSize(width, height);
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
