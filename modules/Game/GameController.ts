import { Socket } from "socket.io-client";
import CanvasSDK from "./CanvasSDK";
import GameSDK, { GameEvents } from "./GameSDK";

/**
 * This controls the GameSDK based on what it receives from a socket connection
 */
class GameController {
  private callbacks: Record<string, Function> = {};

  constructor(
    private gameSDK: GameSDK,
    private canvasSDK: CanvasSDK,
    private io: Socket
  ) {}

  addSocketCallbacks() {
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
      (playerID, questionNumber, hintLength, endTime) => {
        this.gameSDK.setCurrentQuestion(
          playerID,
          questionNumber,
          hintLength,
          endTime
        );
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
    for (let [event, callback] of Object.entries(this.callbacks)) {
      this.io.off(event, callback);
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
}

export default GameController;
