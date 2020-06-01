export class Effect {
  constructor(/** @type import("./../game/game").Game*/ game, source, config) {
    this.game = game
    this.source = source
    this.config = config
  }
}
