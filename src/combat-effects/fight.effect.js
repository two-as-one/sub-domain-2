import { Effect } from "./_effect"

export class FightEffect extends Effect {
  describe() {
    return `Enter fight stance.`
  }

  apply() {
    this.game.scene.stance = "fight"
  }
}
