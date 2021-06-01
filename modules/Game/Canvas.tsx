/** A polyfill for Canvas */

import React, { Component } from "react";
import { Platform, StyleProp, View, ViewStyle } from "react-native";
import { CanvasRenderingContext2D as MobileCanvasRenderingContext2D } from "react-native-canvas";

type RenderingContext =
  | CanvasRenderingContext2D
  | MobileCanvasRenderingContext2D;

export { RenderingContext as CanvasRenderingContext2D };

type Props = {
  style?: StyleProp<ViewStyle>;
};

const MobileCanvas =
  Platform.OS === "web" ? null : require("react-native-canvas").default;

class Canvas extends Component<Props> {
  canvas: // @ts-expect-error
  MobileCanvas | HTMLCanvasElement;

  constructor(props: Props) {
    super(props);
    this.canvas = null;
  }

  set width(value: number) {
    this.canvas.width = value;
  }

  get width() {
    return this.canvas.width;
  }

  set height(value: number) {
    this.canvas.height = value;
  }

  get height() {
    return this.canvas.height;
  }

  get2D(): MobileCanvasRenderingContext2D | CanvasRenderingContext2D {
    if (this.canvas instanceof MobileCanvas) {
      return this.canvas.getContext("2d");
    } else {
      return this.canvas.getContext("2d");
    }
  }

  render() {
    const { style } = this.props;
    if (Platform.OS === "web") {
      return (
        <View style={style}>
          <canvas ref={(canvas) => (this.canvas = canvas)} />
        </View>
      );
    } else {
      return (
        <MobileCanvas ref={(canvas) => (this.canvas = canvas)} style={style} />
      );
    }
  }
}

export default Canvas;
