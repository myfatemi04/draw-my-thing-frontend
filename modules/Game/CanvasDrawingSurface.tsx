import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, StyleSheet, View, ViewProps } from "react-native";
import Canvas from "react-native-canvas";
import ColorPicker, { Color } from "./ColorPicker";
import GameContext from "./GameContext";

function CanvasDrawingSurface({ active }: { active: boolean }) {
  const { canvasSDK, gameController } = useContext(GameContext);

  const [touchIdentifier, setTouchIdentifier] = useState<string>(null);
  const [color, setColor] = useState<Color>("black");

  const setCanvas = useCallback(
    (canvas: Canvas) => {
      canvasSDK.setCanvas(canvas);
    },
    [canvasSDK]
  );

  const onTouchStart = useCallback<ViewProps["onTouchStart"]>(
    (event) => {
      if (touchIdentifier == null) {
        setTouchIdentifier(event.nativeEvent.identifier);
        const { locationX: x, locationY: y } = event.nativeEvent;
        canvasSDK.startPath(x, y);
        gameController.sendPathStart(x, y);
      }
    },
    [canvasSDK, gameController, touchIdentifier]
  );

  const onTouchMove = useCallback<ViewProps["onTouchMove"]>(
    (event) => {
      if (touchIdentifier == event.nativeEvent.identifier) {
        const { locationX: x, locationY: y } = event.nativeEvent;
        canvasSDK.moveTo(x, y);
        gameController.sendPathMove(x, y);
      }
    },
    [canvasSDK, gameController, touchIdentifier]
  );

  const onTouchEnd = useCallback<ViewProps["onTouchEnd"]>(
    (event) => {
      if (touchIdentifier == event.nativeEvent.identifier) {
        setTouchIdentifier(null);
        canvasSDK.endPath();
        gameController.sendPathEnd();
      }
    },
    [canvasSDK, gameController, touchIdentifier]
  );

  const clear = useCallback(() => {
    canvasSDK.clear();
    gameController.sendCanvasClear();
  }, [canvasSDK]);

  useEffect(() => {
    if (active) {
      canvasSDK.setStrokeColor(color);
      gameController.sendColorChange(color);
    }
  }, [canvasSDK, gameController, color, active]);

  return (
    <>
      <View
        onLayout={({ nativeEvent }) => {
          const { width, height } = nativeEvent.layout;
          canvasSDK.setSize(width, height);
        }}
        style={styles.canvasContainer}
        {...(active
          ? {
              onTouchStart,
              onTouchMove,
              onTouchEnd,
            }
          : {})}
      >
        <Canvas ref={setCanvas} style={styles.canvasContainer} />
      </View>
      {active && (
        <>
          <ColorPicker
            color={color}
            onPickedColor={(color) => setColor(color)}
          />
          <Button onPress={() => clear()} title="Clear" />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  canvasContainer: {
    width: 400,
    height: 400,
    borderColor: "black",
    borderWidth: 2,
  },
  canvas: {
    width: "100%",
    height: "100%",
  },
});

export default CanvasDrawingSurface;
