import { Effect } from "./_effect"
import tooltips from "./_tooltips.yaml"

export class LoveBlockEffect extends Effect {
  get value() {
    return this.config.value || 0
  }

  describe() {
    return `Block ${this.value} love.`
  }

  apply() {
    this.source.block(this.value, "love")
  }

  get tooltips() {
    return [tooltips.loveBlock, tooltips.turnDuration]
  }
}
