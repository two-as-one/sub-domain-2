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

  describe() {
    if (this.value === this.config.value) {
      return `Deal ${this.value} pain.`
    } else {
      return html`Deal <strong>${this.value}</strong> pain.`
    }
  }

  apply(target) {
    target.damage(this.value, "pain")
  }

  get tooltips() {
    return [tooltips.fight]
  }
}
