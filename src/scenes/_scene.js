export class Scene {
  constructor(/** @type import("../game/game").Game*/ game) {
    this.game = game
  }

  unload() {
    /** No-op function, extend this with your functionality, called by the game when the scene ends */
  }
}
