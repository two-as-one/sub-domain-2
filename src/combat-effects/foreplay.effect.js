import { Effect } from "./_effect"
import CONFIG from "../config.yaml"

export class ForeplayEffect extends Effect {
  get description() {
    return `<span class="pink">Seduce!</span>`
  }

  get color() {
    return "pink"
  }

  apply() {
    this.game.scene.stance = "foreplay"
  }

  get tooltips() {
    return [CONFIG.tooltips.foreplay]
  }
}
