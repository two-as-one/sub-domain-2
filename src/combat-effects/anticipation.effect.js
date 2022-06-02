import { Effect } from "./_effect"
import { html } from "lit"
import CONFIG from "../config.yaml"

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
    return [CONFIG.tooltips.anticipation, CONFIG.tooltips.turnDuration]
  }
}
