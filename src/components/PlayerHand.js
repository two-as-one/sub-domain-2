import { html, css, LitElement } from "lit"
import { GameCard } from "./GameCard"
import { repeat } from "lit/directives/repeat.js"
import { classMap } from "lit/directives/class-map.js"

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
      transform: translateY(300px);
      transition: transform 0.25s ease-in-out;
    }

    .hand.visible {
      transform: translateY(0);
    }

    .card-holder {
      position: absolute;
      left: -70px;
      top: 0;
      transform-origin: 25% var(--transform-origin-y);
      transition: transform-origin 0.1s linear;
      z-index: 1;
    }

    .card-holder:hover {
      z-index: 2;
    }
  `

  static properties = {
    cards: { type: Array },
    isVisible: { state: true },
  }

  render() {
    const classes = { hand: true, visible: this.isVisible }
    const spread = ((10 - this.cards.length) / 10) * 3500 + 500
    this.style.setProperty("--transform-origin-y", `${spread}px`)
    return html`<div class=${classMap(classes)}>
      ${repeat(
        this.cards,
        (card) => card.id,
        (card, i) => {
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
        }
      )}
    </div>`
  }

  constructor() {
    super()
    this.cards = []
  }

  onCardSelected(card) {
    this.dispatchEvent(new CustomEvent("selected", { detail: card }))
  }

  show() {
    this.isVisible = true
  }

  hide() {
    this.isVisible = false
  }
}
