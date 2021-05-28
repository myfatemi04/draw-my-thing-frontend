import React, { ReactNode, useEffect, useMemo, useState } from "react";
import GameContext from "./GameContext";
import GameSDK from "./GameSDK";
import GameState from "./GameState";

function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>();
  const sdk = useMemo(() => new GameSDK(), []);

  useEffect(() => {
    sdk.on("state-update", (state) => {
      setState(state);
    });
  }, []);

  return (
    <GameContext.Provider value={{ gameSDK: sdk, gameState: state }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;
