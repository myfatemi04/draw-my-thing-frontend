import * as immutable from "immutable";
import ChatMessage from "./ChatMessage";
import Player from "./Player";

export type GameStateProps = {
  gameConnectionState: "connecting" | "connected" | "errored" | null;
  gameID: string | null;
  state: "waiting" | "playing" | "ended";
  players: immutable.Map<string, Player>;
  localUserID: string;
  localNickname: string;
  /**
   * Letters are gradually revealed
   */
  hintText: string;
  roundNumber: number;
  roundCount: number;
  guessedCorrectlyThisQuestion: boolean;
  chatMessages: immutable.List<ChatMessage>;
  lastQuestionAnswer: string;
  currentQuestionPlayerID: string;
  currentQuestionEndTime: number;
  /**
   * If we are in a lobby, this tells us when the game will start.
   */
  gameStartTime: number;
  whatToDraw: string;
};

class GameState extends immutable.Record<GameStateProps>({
  gameConnectionState: null,
  gameID: null,
  state: "waiting",
  players: immutable.Map(),
  localUserID: "",
  localNickname: "",
  hintText: "",
  roundNumber: 0,
  roundCount: 0,
  guessedCorrectlyThisQuestion: false,
  chatMessages: immutable.List(),
  lastQuestionAnswer: "",
  currentQuestionPlayerID: "",
  currentQuestionEndTime: -1,
  gameStartTime: -1,
  whatToDraw: "",
}) {}

export default GameState;
