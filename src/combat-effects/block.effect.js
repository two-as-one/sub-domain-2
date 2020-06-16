import { Effect } from "./_effect"
import { html } from "lit-html"
import tooltips from "./_tooltips.yaml"

export class BlockEffect extends Effect {
  get value() {
    return this.config.value || 0
  }

  get description() {
    return html`<span class="effect">Block ${this.value} pain. </span>`
  }

  apply() {
    this.source.block(this.value, "pain")
  }

  get tooltips() {
    return [tooltips.block, tooltips.turnDuration]
  }
}
