import React, { useCallback, useContext, useState } from "react";
import { TextInput, View, Button, StyleSheet } from "react-native";
import ConnectionStatusIndicator from "../Debug/ConnectionStatusIndicator";
import InitializationContext from "../Initialization/InitializationContext";
import UIText from "../ui/UIText";

export default function BeforeGameLoadedScreen() {
  const [temporaryRoomID, setTemporaryRoomID] = useState("");
  const { joinRoom, createRoom, cancelJoinRoom, connectionStatus } = useContext(
    InitializationContext
  );

  const onPressJoin = () => {
    if (temporaryRoomID.length > 0) {
      joinRoom(temporaryRoomID);
    }
  };

  const onPressCreate = useCallback(() => {
    createRoom();
  }, []);

  const onChangeText = useCallback((text: string) => {
    setTemporaryRoomID(text);
  }, []);

  return (
    <View style={styles.screen}>
      <UIText variant="header">Draw My Thing</UIText>
      <TextInput
        onChangeText={onChangeText}
        maxLength={10}
        style={styles.text}
        editable={connectionStatus !== "connecting"}
      />
      <ConnectionStatusIndicator />
      {connectionStatus !== "connecting" ? (
        <Button
          onPress={onPressJoin}
          title="Join"
          disabled={temporaryRoomID.length === 0}
        />
      ) : (
        <Button onPress={cancelJoinRoom} title="Cancel" />
      )}
      <Button onPress={onPressCreate} title="Create" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 2,

    marginTop: 25,
    marginBottom: 25,

    padding: 10,

    width: 240,
    fontSize: 35,
  },
  button: {
    marginTop: 50,
    marginBottom: 50,
  },
});
