import { Effect } from "./_effect"

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
}
