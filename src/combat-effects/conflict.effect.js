import { Effect } from "./_effect"
import { html } from "lit"
import CONFIG from "../config.yaml"

export class ConflictEffect extends Effect {
  get description() {
    return html`<span class="effect blue">Fight! </span>`
  }

  apply() {
    this.game.scene.stance = "conflict"
  }

  get tooltips() {
    return [CONFIG.tooltips.conflict]
  }
}
