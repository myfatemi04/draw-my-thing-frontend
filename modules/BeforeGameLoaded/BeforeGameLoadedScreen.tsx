import React, { useCallback, useContext, useRef, useState } from "react";
import { TextInput, View, Text, Button, StyleSheet } from "react-native";
import InitializationContext from "../Initialization/InitializationContext";

export default function BeforeGameLoadedScreen() {
  const textInput = useRef<TextInput>();
  const [temporaryRoomID, setTemporaryRoomID] = useState("");
  const { joinRoom } = useContext(InitializationContext);

  const onPress = useCallback(() => {
    joinRoom(temporaryRoomID);
  }, []);

  const onChangeText = useCallback((text: string) => {
    setTemporaryRoomID(text);
  }, []);

  return (
    <View style={styles.screen}>
      <Text>Test</Text>
      <TextInput
        onChangeText={onChangeText}
        maxLength={10}
        style={styles.text}
      />
      <Button onPress={onPress} title="Join">
        Join
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
