import { Effect } from "./_effect"
import CONFIG from "../config.yaml"

export class BlockEffect extends Effect {
  get value() {
    return this.config.value || 0
  }

  get description() {
    return `Block <span class="blue"> ${this.value} pain</span>.`
  }

  get color() {
    return "blue"
  }

  apply() {
    this.source.block(this.value, "pain")
  }

  get tooltips() {
    return [CONFIG.tooltips.block]
  }
}
