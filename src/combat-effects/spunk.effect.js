import { Effect } from "./_effect"

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
}
