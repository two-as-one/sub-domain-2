import { Effect } from "./_effect"

export class ForeplayEffect extends Effect {
  describe() {
    return `Enter foreplay stance.`
  }

  apply() {
    this.game.scene.stance = "foreplay"
  }
}
