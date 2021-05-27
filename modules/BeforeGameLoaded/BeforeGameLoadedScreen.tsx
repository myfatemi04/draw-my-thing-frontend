import React, { useCallback, useContext, useRef, useState } from "react";
import { TextInput, View, Text, Button, StyleSheet } from "react-native";
import InitializationContext from "../Initialization/InitializationContext";

export default function BeforeGameLoadedScreen() {
  const [temporaryRoomID, setTemporaryRoomID] = useState("");
  const { joinRoom, createRoom, connectionStatus } = useContext(
    InitializationContext
  );

  const onPressJoin = useCallback(() => {
    if (temporaryRoomID.length > 0) {
      joinRoom(temporaryRoomID);
    }
  }, []);

  const onPressCreate = useCallback(() => {
    createRoom();
  }, []);

  const onChangeText = useCallback((text: string) => {
    setTemporaryRoomID(text);
  }, []);

  const joinButtonString =
    connectionStatus === "connecting" ? "Joining..." : "Join";

  return (
    <View style={styles.screen}>
      <Text>Draw My Thing</Text>
      <TextInput
        onChangeText={onChangeText}
        maxLength={10}
        style={styles.text}
      />
      <Button
        onPress={onPressJoin}
        title="Join"
        disabled={temporaryRoomID.length === 0}
      />
      <Button onPress={onPressCreate} title="Create" />
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

    marginTop: 50,
    marginBottom: 50,
  },
  button: {
    marginTop: 50,
    marginBottom: 50,
  },
});
