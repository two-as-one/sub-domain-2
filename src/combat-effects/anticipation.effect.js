import { Effect } from "./_effect"
import { html } from "lit-html"
import tooltips from "./_tooltips.yaml"

export class AnticipationEffect extends Effect {
  get value() {
    return this.config.value || 0
  }

  get description() {
    return html`<span class="effect">Anticipate ${this.value} love. </span>`
  }

  apply() {
    this.source.block(this.value, "love")
  }

  get tooltips() {
    return [tooltips.anticipation, tooltips.turnDuration]
  }
}
