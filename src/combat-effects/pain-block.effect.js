import { Effect } from "./_effect"

export class PainBlockEffect extends Effect {
  get value() {
    return this.config.value || 0
  }

  describe() {
    return `Block ${this.value} pain.`
  }

  apply() {
    this.source.block(this.value, "pain")
  }
}
