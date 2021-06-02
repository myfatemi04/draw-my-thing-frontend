import replaceStringCharacter from "../lib/replaceStringCharacter";
import ChatMessage from "./ChatMessage";
import GameState from "./GameState";
import Player from "./Player";
import * as immutable from "immutable";

export type GameEvents = {
  /**
   * Signals that the connection to the game server succeeded
   */
  connected: [string]; // roomID
  "already-in-room": [];
  "room-not-found": [];

  /**
   * Signals that the current player put the paintbrush down.
   */
  "path-started": [number, number]; // x, y

  /**
   * Signals that the current player moved the paintbrush.
   */
  "path-moved": [number, number]; // x, y

  /**
   * Signals that the current player picked the paintbrush up.
   */
  "path-ended": [];

  /**
   * Signals the list of players currently in the room.
   */
  "player-list": [
    [string, string][] // array of id, nickname
  ];

  /**
   * Signals that a player joined.
   */
  "player-joined": [string, string]; // id, nickname

  /**
   * Signals that a player left.
   */
  "player-left": [string]; // id

  /**
   * Updates how many points there are for an individual player.
   */
  "point-update": [string, number]; // player id, point count

  /**
   * Reveals one letter of the hint.
   */
  "hint-reveal": [number, string]; // index, letter

  /**
   * If the local player is drawing, we tell them what to draw.
   */
  "what-to-draw": [string];

  /**
   * Signals the start of a question.
   */
  "question-started": [string, number, number]; // player id, hint length, end time

  /**
   * Signals the end of a question.
   */
  "question-ended": [boolean, string]; // was found, answer

  /**
   * Signals the start of a round.
   */
  "round-started": [number]; // current round

  /**
   * Signals the end of a round.
   */
  "round-ended": [number, number]; // questions answered correctly, total questions given

  /**
   * Signals that the game will start soon.
   */
  "game-will-start": [number]; // when the game will start

  /**
   * Signals the start of a game.
   */
  "game-started": [number]; // total round count

  /**
   * Signals the end of a game.
   */
  "game-ended": [
    [string, string, string], // top three player ids
    { [playerID: string]: number } // point counts of each player
  ];

  /**
   * Signals that a player sent a chat message.
   */
  "chat-message": [string, string]; // player id, message content

  /**
   * Signals that a player guessed the answer correctly.
   */
  "player-guessed-correctly": [string]; // player id

  /**
   * Signals that the guess most recently sent by the local player was almost correct.
   */
  "player-almost-guessed-correctly": [];

  /**
   * Emits a state update that can be observed by React.
   */
  "state-update": [GameState];
};

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
