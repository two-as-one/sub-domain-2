import { Effect } from "./_effect"
import tooltips from "./_tooltips.yaml"

export class FightEffect extends Effect {
  describe() {
    return `Enter fight stance.`
  }

  apply() {
    this.game.scene.stance = "fight"
  }

  get tooltips() {
    return [tooltips.fight]
  }
}
