import { Effect } from "./_effect"
import CONFIG from "../config.yaml"

export class AnticipationEffect extends Effect {
  get value() {
    return this.config.value || 0
  }

  get description() {
    return `Block <span class="pink"> ${this.value} love</span>.`
  }

  get color() {
    return "pink"
  }

  apply() {
    this.source.block(this.value, "love")
  }

  get tooltips() {
    return [CONFIG.tooltips.block]
  }
}
