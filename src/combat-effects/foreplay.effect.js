import { Effect } from "./_effect"
import { html } from "lit"
import CONFIG from "../config.yaml"

export class ForeplayEffect extends Effect {
  get description() {
    return html`<span class="effect pink">Seduce! </span>`
  }

  apply() {
    this.game.scene.stance = "foreplay"
  }

  get tooltips() {
    return [CONFIG.tooltips.foreplay]
  }
}
