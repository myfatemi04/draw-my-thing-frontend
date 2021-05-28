import React from "react";
import UIRow from "../ui/UIRow";
import { View, StyleSheet, ViewStyle } from "react-native";
import UICircle from "../ui/UICircle";
import UIText from "../ui/UIText";

const colors = ["black", "red", "orange", "yellow", "green", "blue"] as const;

export type Color = typeof colors[number];

export default function ColorPicker({
  color,
  onPickedColor,
}: {
  color: Color;
  onPickedColor: (color: Color) => void;
}) {
  const selectedColor = color;
  return (
    <View style={style.container}>
      <UIText variant="body">Choose Color</UIText>
      <UIRow spacing={10} centerHorizontal style={{ marginTop: 10 }}>
        {colors.map((color) => {
          return (
            <UICircle
              color={color}
              radius={40}
              key={color}
              {...(color == selectedColor ? { borderColor: "grey" } : {})}
              onTouchEnd={() => onPickedColor(color)}
            />
          );
        })}
      </UIRow>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as ViewStyle,
});
