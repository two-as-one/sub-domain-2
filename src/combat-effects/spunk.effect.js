import { Effect } from "./_effect"
import tooltips from "./_tooltips.yaml"

export class SpunkEffect extends Effect {
  get value() {
    return this.config.value || 0
  }

  describe() {
    return `Spunk ${this.value}.`
  }

  apply() {
    this.source.spunk += this.value
  }

  get tooltips() {
    return [tooltips.spunk, tooltips.consumedOnUse]
  }
}
