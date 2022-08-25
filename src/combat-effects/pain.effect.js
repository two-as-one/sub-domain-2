import { Effect } from "./_effect"
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
      return `Deal <span class="blue"> ${this.value} pain</span>.`
    } else {
      return `Deal <strong>${this.value}</strong
        > <span class="blue">pain</span>.`
    }
  }

  get color() {
    return "blue"
  }

  apply(target) {
    target.damage(this.value, "pain")
  }

  get tooltips() {
    return [CONFIG.tooltips.conflict]
  }
}
