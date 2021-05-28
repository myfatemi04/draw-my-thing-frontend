type GameEvents = {
  "path-started": [number, number];
  "path-moved": [number, number];
  "path-ended": [];
  "player-joined": [string, string]; // id, nickname
  "player-left": [string]; // id
  "player-drawing": [string]; // id
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
}

export default GameSDK;
