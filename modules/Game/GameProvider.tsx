import React, {
  ReactNode,
  useDebugValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import CanvasSDK from "./CanvasSDK";
import GameContext from "./GameContext";
import GameController from "./GameController";
import GameSDK from "./GameSDK";
import GameState from "./GameState";

function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(() => new GameState());
  const canvasSDK = useMemo(() => new CanvasSDK(), []);
  const gameSDK = useMemo(() => new GameSDK(), []);
  const gameController = useMemo(() => new GameController(), []);

  useEffect(() => {
    gameController.setGameSDK(gameSDK);
  }, [gameController, gameSDK]);

  useEffect(() => {
    gameController.setCanvasSDK(canvasSDK);
  }, [gameController, canvasSDK]);

  useEffect(() => {
    gameSDK.on("state-update", (state) => {
      console.log("[game provider] state update:", state.toJSON());
      setGameState(state);
    });
  }, []);

  const value = useMemo(
    () => ({
      gameSDK,
      gameState,
      gameController,
      canvasSDK,
    }),
    [gameSDK, gameState, gameController, canvasSDK]
  );

  useDebugValue(value);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export default GameProvider;
