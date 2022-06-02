import { html, css, LitElement } from "lit"
import { ChatLog } from "../ChatLog"
import { ChatOptions } from "../ChatOptions"
import { PlayerHand } from "../PlayerHand"

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
    hand: { state: true },
  }

  constructor() {
    super()
    this.options = []
    this.hand = []
  }

  firstUpdated() {
    this._fsm()
  }

  render() {
    return html`<chat-log></chat-log>
      <chat-options .options=${this.options}></chat-options>
      <player-hand
        .cards=${this.hand}
        @selected=${(card) => this.onCardUsed(card)}
      ></player-hand> `
  }

  get chat() {
    return this.shadowRoot.querySelector("chat-log")
  }

  onCardUsed(e) {
    console.log(e)
  }
}
