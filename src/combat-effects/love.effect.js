import { Effect } from "./_effect"
import CONFIG from "../config.yaml"

export class LoveEffect extends Effect {
  get value() {
    let val = this.config.value || 0

    if (this.game.scene.stance === "foreplay") {
      val *= 2
    }

    return val
  }

  get description() {
    if (this.value === this.config.value) {
      return `Deal <span class="pink"> ${this.value} love</span>.`
    } else {
      return `Deal <strong>${this.value}</strong>
        <span class="pink">love</span>. `
    }
  }

  get color() {
    return "pink"
  }

  apply(target) {
    target.damage(this.value, "love")
  }

  get tooltips() {
    return [CONFIG.tooltips.foreplay]
  }
}
