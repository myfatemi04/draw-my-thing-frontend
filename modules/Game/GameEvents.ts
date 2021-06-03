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
