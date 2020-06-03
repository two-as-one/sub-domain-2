import { Effect } from "./_effect"
import tooltips from "./_tooltips.yaml"

export class ForeplayEffect extends Effect {
  describe() {
    return `Enter foreplay stance.`
  }

  apply() {
    this.game.scene.stance = "foreplay"
  }

  get tooltips() {
    return [tooltips.foreplay]
  }
}
