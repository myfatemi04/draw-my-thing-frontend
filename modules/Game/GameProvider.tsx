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

const GAME_URL = "172.20.10.4:7000";

function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(() => new GameState());
  const canvasSDK = useMemo(() => new CanvasSDK(), []);
  const gameSDK = useMemo(() => new GameSDK(), []);
  const gameController = useMemo(() => new GameController(GAME_URL), []);

  useEffect(() => {
    gameController.setCanvasSDK(canvasSDK);
  }, [gameController, canvasSDK]);

  useEffect(() => {
    gameSDK.on("state-update", (state) => {
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
