import React, { ReactNode } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

export default function UIText({
  variant,
  children,
  style,
}: {
  variant: keyof typeof styles;
  children: ReactNode;
  style?: TextStyle;
}) {
  return (
    <Text
      style={
        style
          ? StyleSheet.compose(styles[variant] as TextStyle, style)
          : styles[variant]
      }
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 48,
    fontWeight: "bold",
    color: "black",
  },
  listTitle: {
    fontSize: 32,
    fontWeight: "600",
    color: "black",
  },
  body: {
    fontSize: 24,
    fontWeight: "normal",
    color: "grey",
  },
  bodyBold: {
    fontSize: 24,
    fontWeight: "bold",
    color: "grey",
  },
  caption: {
    fontSize: 14,
    fontWeight: "500",
    color: "grey",
  },
});
