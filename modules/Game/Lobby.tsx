import React from "react";
import UIText from "../ui/UIText";
import { usePlayers, useStartTime } from "./GameHooks";
import useSecondsRemaining from "./useSecondsRemaining";

function Lobby() {
  const players = usePlayers();
  const startTime = useStartTime();
  const timeUntilStart = useSecondsRemaining(startTime);
  return (
    <>
      <UIText variant="header">Lobby</UIText>
      <UIText variant="body" style={{ marginTop: 20 }}>
        The game will automatically start when there are at least four players.
      </UIText>
      {startTime > 0 && (
        <UIText variant="body" style={{ marginTop: 20 }}>
          Starting in {timeUntilStart} seconds
        </UIText>
      )}
      <UIText variant="listTitle" style={{ marginTop: 20, marginBottom: 20 }}>
        Players
      </UIText>
      {players.entrySeq().map(([id, player]) => {
        return (
          <>
            <UIText variant="bodyBold">{player.nickname}</UIText>
          </>
        );
      })}
      <UIText variant="bodyBold">Me</UIText>
    </>
  );
}

export default Lobby;
