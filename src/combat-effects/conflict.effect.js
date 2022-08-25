import { Effect } from "./_effect"
import CONFIG from "../config.yaml"

export class ConflictEffect extends Effect {
  get description() {
    return `<span class="blue">Fight!</span>`
  }

  get color() {
    return "blue"
  }

  apply() {
    this.game.scene.stance = "conflict"
  }

  get tooltips() {
    return [CONFIG.tooltips.conflict]
  }
}
