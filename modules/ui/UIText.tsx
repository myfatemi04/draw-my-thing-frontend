import React, { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

export default function UIText({
  variant,
  children,
}: {
  variant: keyof typeof styles;
  children: ReactNode;
}) {
  return <Text style={styles[variant]}>{children}</Text>;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  body: {
    fontSize: 14,
    fontWeight: "normal",
    color: "grey",
  },
});
