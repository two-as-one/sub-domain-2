import { Effect } from "./_effect"
import tooltips from "./_tooltips.yaml"

export class AnticipationEffect extends Effect {
  get value() {
    return this.config.value || 0
  }

  describe() {
    return `Anticipate ${this.value} love.`
  }

  apply() {
    this.source.block(this.value, "love")
  }

  get tooltips() {
    return [tooltips.anticipation, tooltips.turnDuration]
  }
}
