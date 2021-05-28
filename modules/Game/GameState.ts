import * as immutable from "immutable";
import ChatMessage from "./ChatMessage";
import Player from "./Player";

export type GameStateProps = {
  state: "waiting" | "playing" | "ended";
  players: immutable.Map<string, Player>;
  localUserID: string;
  localNickname: string;
  hintText: string;
  questionNumber: number;
  roundNumber: number;
  roundCount: number;
  guessedCorrectlyThisQuestion: boolean;
  chatMessages: immutable.List<ChatMessage>;
  lastQuestionAnswer: string;
  currentQuestionPlayerID: string;
  currentQuestionEndTime: number;
};

class GameState extends immutable.Record<GameStateProps>({
  state: "waiting",
  players: immutable.Map(),
  localUserID: "",
  localNickname: "",
  hintText: "",
  questionNumber: 0,
  roundNumber: 0,
  roundCount: 0,
  guessedCorrectlyThisQuestion: false,
  chatMessages: immutable.List(),
  lastQuestionAnswer: "",
  currentQuestionPlayerID: "",
  currentQuestionEndTime: -1,
}) {}

export default GameState;
