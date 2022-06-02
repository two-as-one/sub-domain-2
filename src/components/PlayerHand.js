import { html, css, LitElement } from "lit"
import { GameCard } from "./GameCard"

customElements.define("game-card", GameCard)

export class PlayerHand extends LitElement {
  static styles = css`
    :host {
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: center;
      position: relative;
      width: 500px;
      height: 0;
    }

    .hand {
      height: 300px;
      position: absolute;
      bottom: 0;
    }

    .card-holder {
      position: absolute;
      left: -70px;
      top: 0;
      transform-origin: 25% var(--transform-origin-y);
      z-index: 1;
    }

    .card-holder:hover {
      z-index: 2;
    }
  `

  static properties = {
    cards: { type: Array },
  }

  render() {
    const spread = ((10 - this.cards.length) / 10) * 2000 + 1000
    this.style.setProperty("--transform-origin-y", `${spread}px`)
    return html`<div class="hand">
      ${this.cards.map((card, i) => {
        const rotation = (i - (this.cards.length - 1) / 2) * 3

        return html`<div
          class="card-holder"
          style="transform:rotate(${rotation}deg)"
        >
          <game-card
            .card=${card}
            @click=${() => this.onCardSelected(card)}
          ></game-card>
        </div>`
      })}
    </div>`
  }

  constructor() {
    super()
    this.cards = []
  }

  onCardSelected(card) {
    this.dispatchEvent(new CustomEvent("selected", { detail: card }))
  }

  show() {}

  hide() {}
}
