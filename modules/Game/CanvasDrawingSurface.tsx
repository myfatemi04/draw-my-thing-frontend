import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button, StyleSheet, View, ViewProps } from "react-native";
import { Accelerometer } from "expo-sensors";
import Canvas from "./Canvas";
import ColorPicker, { Color } from "./ColorPicker";
import GameContext from "./GameContext";

function magnitude({ x, y, z }: { x: number; y: number; z: number }) {
  return (x ** 2 + y ** 2 + z ** 2) ** 0.5;
}

const SHAKE_MINIMUM_MAGNITUDE = 3;

function CanvasDrawingSurface({ active }: { active: boolean }) {
  const { canvasSDK, gameController } = useContext(GameContext);

  const [touchIdentifier, setTouchIdentifier] = useState<string>(null);
  const [color, setColor] = useState<Color>("black");

  useEffect(() => {
    let hasShake = false;

    const listener = Accelerometer.addListener((d) => {
      const m = magnitude(d);
      if (m > SHAKE_MINIMUM_MAGNITUDE) {
        if (!hasShake) {
          hasShake = true;
        } else {
          canvasSDK.clear();
        }
      } else {
        hasShake = false;
      }
    });

    return () => {
      listener.remove();
    };
  }, [canvasSDK]);

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

  const activeProps = useMemo(
    () =>
      active || true
        ? {
            onTouchStart,
            onTouchMove,
            onTouchEnd,
          }
        : {},
    [active, onTouchStart, onTouchMove, onTouchEnd]
  );

  return (
    <>
      <View
        onLayout={({ nativeEvent }) => {
          const { width, height } = nativeEvent.layout;
          canvasSDK.setSize(width, height);
        }}
        style={styles.canvasContainer}
        {...activeProps}
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
    marginLeft: 0,
    marginRight: 0,
    maxHeight: 400,
    borderColor: "black",
    borderWidth: 2,
  },
  canvas: {
    width: "100%",
    height: "100%",
  },
});

export default CanvasDrawingSurface;
