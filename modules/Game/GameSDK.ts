import * as immutable from "immutable";
import replaceStringCharacter from "../lib/replaceStringCharacter";
import ChatMessage from "./ChatMessage";
import { GameEvents } from "./GameEvents";
import GameState from "./GameState";
import Player from "./Player";
class GameSDK {
  private callbacks = new Map<keyof GameEvents, Set<Function>>();

  private _state = new GameState();
  private set state(state: GameState) {
    this._state = state;
    this.emit("state-update", state);
  }
  private get state() {
    return this._state;
  }

  on<E extends keyof GameEvents>(
    event: E,
    callback: (...args: GameEvents[E]) => void
  ) {
    let set: Set<Function>;
    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, (set = new Set()));
    } else {
      set = this.callbacks.get(event);
    }
    set.add(callback);
    return () => set.delete(callback);
  }

  emit<E extends keyof GameEvents>(event: E, ...args: GameEvents[E]) {
    const set = this.callbacks.get(event);
    if (set) {
      set.forEach((callback) => callback(...args));
    }
  }

  gameWillStart(startTime: number) {
    this.state = this.state.set("gameStartTime", startTime);
  }

  leaveGame() {
    this.state = this.state
      .set("gameConnectionState", null)
      .set("gameStartTime", -1)
      .set("gameID", "");
  }

  setGameID(id: string) {
    this.state = this.state.set("gameID", id);
  }

  setConnectionState(state: GameState["gameConnectionState"]) {
    this.state = this.state.set("gameConnectionState", state);
  }

  addPlayer(id: string, nickname: string, points = 0) {
    const player = new Player(id, nickname, points);
    const players = this.state.players.set(id, player);
    this.state = this.state.set("players", players);
  }

  removePlayer(id: string) {
    const players = this.state.players.delete(id);
    this.state = this.state.set("players", players);
  }

  setPlayers(players: [string, string][]) {
    const playerList: [string, Player][] = [];
    for (let [id, nickname] of players) {
      playerList.push([id, new Player(id, nickname)]);
    }
    const playerMap = immutable.Map(playerList);
    this.state = this.state.set("players", playerMap);
  }

  setPlayerPoints(id: string, points: number) {
    const player = this.state.players.get(id).set("points", points);
    const players = this.state.players.set(id, player);
    return players;
  }

  setLocalUserID(id: string) {
    this.state = this.state.set("localUserID", id);
  }

  setLocalNickname(nickname: string) {
    this.state = this.state.set("localNickname", nickname);
  }

  setGameState(state: GameState["state"]) {
    this.state = this.state.set("state", state);
  }

  gameStarted(roundCount: number) {
    this.state = this.state
      .set("state", "playing")
      .set("roundCount", roundCount);
  }

  gameEnded() {
    this.state = this.state.set("state", "ended");
  }

  setRoundNumber(roundNumber: number) {
    this.state = this.state.set("roundNumber", roundNumber);
  }

  setCurrentQuestion(playerID: string, hintLength: number, endTime: number) {
    this.state = this.state
      .set("currentQuestionPlayerID", playerID)
      .set("hintText", "_".repeat(hintLength))
      .set("currentQuestionEndTime", endTime);
  }

  setLastQuestionAnswer(answer: string) {
    this.state = this.state.set("lastQuestionAnswer", answer);
  }

  setHintText(text: string) {
    this.state = this.state.set("hintText", text);
  }

  revealHintLetter(index: number, letter: string) {
    const hint = replaceStringCharacter(this.state.hintText, index, letter);
    this.state = this.state.set("hintText", hint);
  }

  playerGuessedCorrectly(playerID: string) {
    this.state = this.state.set(
      "players",
      this.state.players.set(
        playerID,
        this.state.players
          .get(playerID)
          .set("guessedCorrectlyThisQuestion", true)
      )
    );
  }

  // TODO: implement playerAlmostGuessedCorrectly
  playerAlmostGuessedCorrectly() {
    throw new Error("Not implemented: playerAlmostGuessedCorrectly()");
  }

  correctlyGuessedThisQuestion() {
    this.state = this.state.set("guessedCorrectlyThisQuestion", true);
  }

  resetCorrectlyGuessedThisQuestion() {
    this.state = this.state.set("guessedCorrectlyThisQuestion", false);
  }

  addChatMessage(playerID: string, messageContent: string) {
    const message = new ChatMessage({
      senderID: playerID,
      content: messageContent,
    });
    const chatMessages = this.state.chatMessages.push(message);
    this.state = this.state.set("chatMessages", chatMessages);
  }
}

export default GameSDK;
