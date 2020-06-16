import { Effect } from "./_effect"
import { html } from "lit-html"
import tooltips from "./_tooltips.yaml"

export class FightEffect extends Effect {
  get description() {
    return html`<span class="effect">Enter fight stance. </span>`
  }

  apply() {
    this.game.scene.stance = "fight"
  }

  get tooltips() {
    return [tooltips.fight]
  }
}
