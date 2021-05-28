type GameEvents = {
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
   * Signals the length of the hint.
   */
  "hint-length": [number]; // length

  /**
   * Reveals one letter of the hint.
   */
  "hint-reveal": [number, string]; // index, letter

  /**
   * Signals the start of a question.
   */
  "question-started": [number, number]; // question number, hint length

  /**
   * Signals the end of a question.
   */
  "question-ended": [boolean, string]; // was found, answer

  /**
   * Signals the start of a round.
   */
  "round-started": [number, number]; // player id, start time, current question

  /**
   * Signals the end of a round.
   */
  "round-ended": [number, number]; // questions answered correctly, total questions given

  /**
   * Signals the start of a game.
   */
  "game-started": [];

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
};

class GameSDK {
  private callbacks = new Map<keyof GameEvents, Set<Function>>();

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

  sendPathStart(x: number, y: number) {}

  sendPathMove(x: number, y: number) {}

  sendPathEnd() {}

  sendChatMessage(content: string) {}
}

export default GameSDK;
