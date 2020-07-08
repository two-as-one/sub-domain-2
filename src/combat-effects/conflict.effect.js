import { Effect } from "./_effect"
import { html } from "lit-html"
import tooltips from "./_tooltips.yaml"

export class ConflictEffect extends Effect {
  get description() {
    return html`<span class="effect">Start conflict. </span>`
  }

  apply() {
    this.game.scene.stance = "conflict"
  }

  get tooltips() {
    return [tooltips.conflict]
  }
}
