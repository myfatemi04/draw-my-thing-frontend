import React, { useCallback, useContext, useRef, useState } from "react";
import { TextInput, View, Text, Button, StyleSheet } from "react-native";
import InitializationContext from "../Initialization/InitializationContext";

export default function BeforeGameLoadedScreen() {
  const [temporaryRoomID, setTemporaryRoomID] = useState("");
  const { joinRoom, createRoom } = useContext(InitializationContext);

  const onPressJoin = useCallback(() => {
    joinRoom(temporaryRoomID);
  }, []);

  const onPressCreate = useCallback(() => {
    createRoom();
  }, []);

  const onChangeText = useCallback((text: string) => {
    setTemporaryRoomID(text);
  }, []);

  return (
    <View style={styles.screen}>
      <Text>Draw My Thing</Text>
      <TextInput
        onChangeText={onChangeText}
        maxLength={10}
        style={styles.text}
      />
      <Button onPress={onPressJoin} title="Join">
        Join
      </Button>
      <Button onPress={onPressCreate} title="Create">
        Create
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

    marginTop: "10pt",
    marginBottom: "10pt",
  },
  button: {
    marginTop: "10pt",
    marginBottom: "10pt",
  },
});
