import { Socket } from "socket.io-client";
import CanvasSDK from "./CanvasSDK";
import GameSDK, { GameEvents } from "./GameSDK";
import { io as connect } from "socket.io-client";
import { Color } from "./ColorPicker";

/**
 * This controls the GameSDK based on what it receives from a socket connection
 */
class GameController {
  private callbacks: Record<string, Function> = {};
  private io: Socket;
  private gameSDK: GameSDK;
  private canvasSDK: CanvasSDK;

  constructor() {}

  setGameSDK(gameSDK: GameSDK) {
    this.gameSDK = gameSDK;
  }

  setCanvasSDK(canvasSDK: CanvasSDK) {
    this.canvasSDK = canvasSDK;
  }

  createAndConnect(gameServerURL: string) {
    console.log("Game Controller: Connecting to", gameServerURL);
    this.io = connect(gameServerURL);
    this.addSocketCallbacks();
    this.gameSDK.setConnectionState("connecting");
    this.io.emit("create and join room", "anon");
  }

  connect(roomID: string, gameServerURL: string) {
    this.io = connect(gameServerURL);
    this.addSocketCallbacks();
    this.io.emit("join room", roomID, "anon");
    this.gameSDK.setConnectionState("connecting");
  }

  disconnect() {
    this.removeSocketCallbacks();
    this.io = null;
    this.gameSDK.leaveGame();
  }

  addSocketCallbacks() {
    this.addSocketCallback("connected", (gameID) => {
      this.gameSDK.setConnectionState("connected");
      this.gameSDK.setGameID(gameID);
    });

    this.addSocketCallback("already-in-room", () => {
      console.error("Already in a room.");
    });

    this.addSocketCallback("room-not-found", () => {
      this.gameSDK.setConnectionState("errored");
    });

    this.addSocketCallback("path-started", (x, y) => {
      this.canvasSDK.startPath(x, y);
    });

    this.addSocketCallback("path-moved", (x, y) => {
      this.canvasSDK.moveTo(x, y);
    });

    this.addSocketCallback("path-ended", () => {
      this.canvasSDK.endPath();
    });

    this.addSocketCallback("player-list", (players) => {
      this.gameSDK.setPlayers(players);
    });

    this.addSocketCallback("player-joined", (id, nickname) => {
      this.gameSDK.addPlayer(id, nickname);
    });

    this.addSocketCallback("player-left", (id) => {
      this.gameSDK.removePlayer(id);
    });

    this.addSocketCallback("point-update", (playerID, points) => {
      this.gameSDK.setPlayerPoints(playerID, points);
    });

    this.addSocketCallback("hint-reveal", (index, letter) => {
      this.gameSDK.revealHintLetter(index, letter);
    });

    this.addSocketCallback(
      "question-started",
      (playerID, hintLength, endTime) => {
        this.gameSDK.setCurrentQuestion(playerID, hintLength, endTime);
      }
    );

    this.addSocketCallback("question-ended", (answerFound, answer) => {
      this.gameSDK.setLastQuestionAnswer(answer);
    });

    this.addSocketCallback("round-started", (roundNumber) => {
      this.gameSDK.setRoundNumber(roundNumber);
    });

    this.addSocketCallback("round-ended", () => {
      console.warn("TODO: implement round-ended callback");
    });

    this.addSocketCallback("game-will-start", (startTime) => {
      this.gameSDK.gameWillStart(startTime);
    });

    this.addSocketCallback("game-started", (roundCount) => {
      this.gameSDK.gameStarted(roundCount);
    });

    this.addSocketCallback(
      "game-ended",
      (topThreePlayerIDs, finalPointTotals) => {
        console.warn(
          "TODO: handle topThreePlayerIDs and finalPointTotals in game-ended callback"
        );

        this.gameSDK.gameEnded();
      }
    );

    this.addSocketCallback(
      "chat-message",
      (playerID: string, messageContent: string) => {
        this.gameSDK.addChatMessage(playerID, messageContent);
      }
    );

    this.addSocketCallback("player-guessed-correctly", (playerID) => {
      this.gameSDK.playerGuessedCorrectly(playerID);
    });

    this.addSocketCallback("player-almost-guessed-correctly", () => {
      this.gameSDK.playerAlmostGuessedCorrectly();
    });
  }

  removeSocketCallbacks() {
    if (this.io) {
      for (let [event, callback] of Object.entries(this.callbacks)) {
        this.io.off(event, callback);
      }
    }
  }

  private addSocketCallback<E extends keyof GameEvents>(
    event: E,
    callback: (...args: GameEvents[E]) => void
  ) {
    // @ts-expect-error
    this.io.on(event, callback);
    this.callbacks[event] = callback;
  }

  private emit(event: string, ...args: any[]) {
    if (!this.io) {
      console.warn("[game controller] io is null");
    } else {
      this.io.emit(event, ...args);
    }
  }

  sendPathStart(x: number, y: number) {
    this.emit("path-start", x, y);
  }

  sendPathMove(x: number, y: number) {
    this.emit("path-move", x, y);
  }

  sendPathEnd() {
    this.emit("path-end");
  }

  sendColorChange(color: Color) {
    this.emit("set-color", color);
  }

  sendCanvasClear() {
    this.emit("clear-canvas");
  }

  sendChatMessage(content: string) {
    this.emit("send-chat-message", content);
  }
}

export default GameController;
