import { Chance } from "chance"
import { html, css, LitElement } from "lit"
import { Player } from "../entities/player.entity"
import { save, define, get, set } from "../state/state"
import { CombatScene } from "./scenes/CombatScene"
import { ExpeditionScene } from "./scenes/ExpeditionScene"
import { GrowScene } from "./scenes/GrowScene"
import { IdentotronScene } from "./scenes/IdentotronScene"
import { MultiplyScene } from "./scenes/MultiplyScene"
import { OasisScene } from "./scenes/OasisScene"
import { ShipScene } from "./scenes/ShipScene"
import { ref, createRef } from "lit/directives/ref.js"

define("game.state", "ship")

customElements.define("ship-scene", ShipScene)
customElements.define("identotron-scene", IdentotronScene)
customElements.define("grow-scene", GrowScene)
customElements.define("expedition-scene", ExpeditionScene)
customElements.define("oasis-scene", OasisScene)
customElements.define("multiply-scene", MultiplyScene)
customElements.define("combat-scene", CombatScene)

export class SubDomainGame extends LitElement {
  static styles = css`
    :host {
      --color-yellow: #fad300;
      --color-pink: #ff00c2;
      --color-blue: #00c2ff;
      --color-black: #000000;
      --color-white: #ffffff;

      --main-color-foreground: var(--color-yellow);
      --main-color-background: var(--color-black);
      --main-color-strong: var(--color-white);

      --spacing-1x: 4px;
      --spacing-2x: 8px;
      --spacing-3x: 16px;

      --font-size-medium: 14px;

      background-color: var(--main-color-background);
      font-family: monospace;
    }

    .sub-domain {
      overflow: hidden;
    }
  `

  $scene = createRef()

  render() {
    const state = get("game.state")

    return html`
      <section class="sub-domain">
        ${{
          identotron: html`<identotron-scene
            .game=${this}
            ${ref(this.$scene)}
          ></identotron-scene>`,
          grow: html`<grow-scene
            .game=${this}
            ${ref(this.$scene)}
          ></grow-scene>`,
          multiply: html`<multiply-scene
            .game=${this}
            ${ref(this.$scene)}
          ></multiply-scene>`,
          ship: html`<ship-scene
            .game=${this}
            ${ref(this.$scene)}
          ></ship-scene>`,
          combat: html`<combat-scene
            .game=${this}
            ${ref(this.$scene)}
          ></combat-scene>`,
          oasis: html`<oasis-scene
            .game=${this}
            ${ref(this.$scene)}
          ></oasis-scene>`,
          expedition: html`<expedition-scene
            .game=${this}
            ${ref(this.$scene)}
          ></expedition-scene>`,
        }[state]}
      </section>
    `
  }

  constructor() {
    super()
    this.player = new Player(this)
    this.chance = new Chance()
    this.setScene()
    window.game = this
  }

  setScene(name = get("game.state")) {
    this.scene?.unload?.()
    set("game.state", name)
    save()
    this.requestUpdate()
  }

  get scene() {
    return this.$scene?.value
  }
}
