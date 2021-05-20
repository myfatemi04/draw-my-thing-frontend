import React, { useCallback, useRef } from "react";
import { TextInput, View, Text, Button, StyleSheet } from "react-native";

export default function BeforeGameLoadedScreen() {
  const textInput = useRef<TextInput>();
  const onPress = useCallback(() => {
    console.log("Button was pressed");
  }, []);

  return (
    <View style={styles.screen}>
      <Text>Test</Text>
      <TextInput ref={textInput} maxLength={10} style={styles.text} />
      <Button onPress={onPress} title="Join Game">
        Join Game
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    display: "flex",
  },
  text: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 2,

    marginTop: "1em",
    marginBottom: "1em",
  },
});
