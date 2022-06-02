import { Effect } from "./_effect"
import { html } from "lit"
import CONFIG from "../config.yaml"

export class PainEffect extends Effect {
  get value() {
    let val = this.config.value || 0

    if (this.game.scene.stance === "conflict") {
      val *= 2
    }

    return val
  }

  get description() {
    if (this.value === this.config.value) {
      return html`<span class="effect blue">Deal ${this.value} pain. </span>`
    } else {
      return html`<span class="effect blue"
        >Deal <strong>${this.value}</strong> pain.
      </span>`
    }
  }

  apply(target) {
    target.damage(this.value, "pain")
  }

  get tooltips() {
    return [CONFIG.tooltips.conflict]
  }
}
