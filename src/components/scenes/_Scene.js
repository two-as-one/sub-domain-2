import { html, css, LitElement } from "lit"
import { ChatLog } from "../ChatLog"
import { ChatOptions } from "../ChatOptions"
import { PlayerHand } from "../PlayerHand"
import { ref, createRef } from "lit/directives/ref.js"

customElements.define("chat-log", ChatLog)
customElements.define("chat-options", ChatOptions)
customElements.define("player-hand", PlayerHand)

export class Scene extends LitElement {
  static styles = css`
    :host {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `

  static properties = {
    game: { type: Object },
    options: { state: true },
  }

  $hand = createRef()

  constructor() {
    super()
    this.options = []
  }

  firstUpdated() {
    this._fsm()
  }

  render() {
    return html`<chat-log></chat-log>
      <chat-options .options=${this.options}></chat-options>
      <player-hand
        ${ref(this.$hand)}
        @selected=${(card) => this.onCardUsed(card)}
      ></player-hand> `
  }

  get hand() {
    return this.$hand?.value
  }

  get chat() {
    return this.shadowRoot.querySelector("chat-log")
  }

  onCardUsed(e) {
    console.log(e)
  }
}
