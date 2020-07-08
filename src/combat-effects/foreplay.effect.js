import { Effect } from "./_effect"
import { html } from "lit-html"
import tooltips from "./_tooltips.yaml"

export class ForeplayEffect extends Effect {
  get description() {
    return html`<span class="effect">Start foreplay. </span>`
  }

  apply() {
    this.game.scene.stance = "foreplay"
  }

  get tooltips() {
    return [tooltips.foreplay]
  }
}
