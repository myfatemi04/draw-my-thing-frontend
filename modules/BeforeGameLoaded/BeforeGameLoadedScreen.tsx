import React, { useCallback, useContext, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import ConnectionStatusIndicator from "../Debug/ConnectionStatusIndicator";
import GameContext from "../Game/GameContext";
import { useConnectionState } from "../Game/GameHooks";
import UIText from "../ui/UIText";

const GAME_SERVER_URL = "http://192.168.0.13:7000";

export default function BeforeGameLoadedScreen() {
  const [temporaryRoomID, setTemporaryRoomID] = useState("");
  const [username, setUsername] = useState("");
  const { gameController } = useContext(GameContext);
  const connectionState = useConnectionState();

  const onPressJoin = useCallback(() => {
    if (temporaryRoomID.length > 0) {
      gameController.connect(temporaryRoomID, GAME_SERVER_URL, username);
    }
  }, [gameController, temporaryRoomID, username]);

  const onPressCreate = useCallback(() => {
    gameController.createAndConnect(GAME_SERVER_URL, username);
  }, [gameController, username]);

  return (
    <View style={styles.screen}>
      <UIText variant="header">Draw My Thing</UIText>
      <UIText variant="caption" style={{ marginTop: 20 }}>
        Username
      </UIText>
      <TextInput
        onChangeText={setUsername}
        maxLength={40}
        style={styles.inputUsername}
        editable={connectionState !== "connecting"}
      />
      <UIText variant="caption">Code</UIText>
      <TextInput
        onChangeText={setTemporaryRoomID}
        maxLength={10}
        style={styles.inputGameID}
        editable={connectionState !== "connecting"}
      />
      <ConnectionStatusIndicator />
      <View
        style={{
          marginBottom: 10,
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {
          connectionState !== "connecting" ? (
            <Button
              onPress={onPressJoin}
              title="Join"
              disabled={temporaryRoomID.length === 0 || username.length === 0}
            />
          ) : null
          // <Button onPress={cancelJoinRoom} title="Cancel" />
        }
        <Button onPress={onPressCreate} title="Create" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputGameID: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 2,

    marginBottom: 25,

    padding: 10,

    width: 240,
    fontSize: 30,
  },
  inputUsername: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 2,

    padding: 5,

    fontSize: 20,
  },
  button: {
    marginTop: 50,
    marginBottom: 50,
  },
});
