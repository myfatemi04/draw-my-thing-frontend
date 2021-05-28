import React, { ReactNode } from "react";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";

export default function UIRow({
  spacing,
  children,
  centerHorizontal = false,
  centerVertical = true,
  style,
}: {
  spacing: number;
  children: ReactNode;
  centerHorizontal?: boolean;
  centerVertical?: boolean;
  style?: ViewStyle;
}) {
  if (!Array.isArray(children)) {
    return <>children</>;
  }

  const defaultStyle = StyleSheet.compose(styles.container, {
    justifyContent: centerHorizontal ? "center" : "flex-start",
    alignItems: centerVertical ? "center" : "flex-start",
  });

  return (
    <View
      style={style ? StyleSheet.compose(defaultStyle, style) : defaultStyle}
    >
      {children.map((child, index) => {
        const isNotLast = index < children.length - 1;
        const isNotFirst = index > 0;
        return (
          <View
            style={{
              marginLeft: isNotFirst ? spacing : 0,
              marginRight: isNotLast ? spacing : 0,
            }}
            key={index}
          >
            {child}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  } as ViewStyle,
  notFirstItem: {
    marginRight: 10,
  } as TextStyle,
  notLastItem: {
    marginLeft: 10,
  } as TextStyle,
});
