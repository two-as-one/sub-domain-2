import { Effect } from "./_effect"
import { html } from "lit-html"
import tooltips from "./_tooltips.yaml"

export class LoveEffect extends Effect {
  get value() {
    let val = this.config.value || 0

    if (this.game.scene.stance === "foreplay") {
      val *= 2
    }

    return val
  }

  describe() {
    if (this.value === this.config.value) {
      return `Deal ${this.value} love.`
    } else {
      return html`Deal <strong>${this.value}</strong> love.`
    }
  }

  apply(target) {
    target.damage(this.value, "love")
  }

  get tooltips() {
    return [tooltips.foreplay]
  }
}
