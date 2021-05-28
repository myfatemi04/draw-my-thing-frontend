import * as immutable from "immutable";

class Player extends immutable.Record({
  id: "",
  nickname: "",
  points: 0,
  guessedCorrectlyThisQuestion: false,
}) {
  constructor(id: string, nickname: string, points = 0) {
    if (!id) {
      throw new Error("invalid id: " + id);
    }
    if (!nickname) {
      throw new Error("invalid nickname: " + nickname);
    }
    if (points < 0) {
      throw new Error("invalid point count: " + points);
    }
    super({
      id,
      nickname,
      points,
    });
  }
}

export default Player;
