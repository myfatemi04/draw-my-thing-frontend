import React from "react";
import {
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { Color } from "../Game/ColorPicker";

export default function UICircle({
  radius,
  color,
  style,
  borderColor,
  ...props
}: {
  radius: number;
  color: Color;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
} & ViewProps) {
  const circleStyle = {
    width: radius,
    height: radius,
    borderRadius: radius,
    backgroundColor: color,
  } as ViewStyle;
  if (borderColor) {
    circleStyle.borderColor = borderColor;
    circleStyle.borderWidth = 2;
  }
  return (
    <View
      style={style ? StyleSheet.compose(style, circleStyle) : circleStyle}
      {...props}
    />
  );
}
