import { Effect } from "./_effect"
import { html } from "lit-html"
import tooltips from "./_tooltips.yaml"

export class PainEffect extends Effect {
  get value() {
    let val = this.config.value || 0

    if (this.game.scene.stance === "fight") {
      val *= 2
    }

    return val
  }

  get description() {
    if (this.value === this.config.value) {
      return html`<span class="effect">Deal ${this.value} pain. </span>`
    } else {
      return html`<span class="effect"
        >Deal <strong>${this.value}</strong> pain.
      </span>`
    }
  }

  apply(target) {
    target.damage(this.value, "pain")
  }

  get tooltips() {
    return [tooltips.fight]
  }
}
