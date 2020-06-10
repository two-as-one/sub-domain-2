import { Effect } from "./_effect"
import tooltips from "./_tooltips.yaml"

export class BlockEffect extends Effect {
  get value() {
    return this.config.value || 0
  }

  describe() {
    return `Block ${this.value} pain.`
  }

  apply() {
    this.source.block(this.value, "pain")
  }

  get tooltips() {
    return [tooltips.block, tooltips.turnDuration]
  }
}
