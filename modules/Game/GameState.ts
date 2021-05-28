import * as immutable from "immutable";
import Player from "./Player";

export type GameStateProps = {
  state: "waiting" | "playing" | "ended";
  players: immutable.Map<string, Player>;
  localUserID: string;
  localNickname: string;
  hintText: string;
  questionNumber: number;
  roundNumber: number;
  guessedCorrectlyThisQuestion: boolean;
};

class GameState extends immutable.Record<GameStateProps>({
  state: "waiting",
  players: immutable.Map(),
  localUserID: "",
  localNickname: "",
  hintText: "",
  questionNumber: 0,
  roundNumber: 0,
  guessedCorrectlyThisQuestion: false,
}) {}

export default GameState;
