import { html, css, LitElement } from "lit"
import { GameCard } from "./GameCard"
import { repeat } from "lit/directives/repeat.js"
import { defineElement } from "../utils/defineElement"

defineElement("game-card", GameCard)

export class CardList extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    game-card {
      margin: var(--spacing-3x);
      z-index: 1;
    }

    game-card:hover {
      z-index: 2;
    }
  `

  static properties = {
    game: { type: Object },
    cards: { type: Array },
    sort: { type: String },
  }

  render() {
    const cards = [...this.cards]

    if (this.sort === "type") {
      cards.sort((a, b) => {
        if (a.type === b.type) {
          return a.name < b.name ? -1 : 1
        } else {
          return a.type < b.type ? -1 : 1
        }
      })
    }

    return html`
      ${repeat(
        cards,
        (card) => card.id,
        (card) => {
          return html`
            <game-card
              .game=${this.game}
              .card=${card}
              @click=${() => this.onCardSelected(card)}
            ></game-card>
          `
        }
      )}
    `
  }

  constructor() {
    super()
    this.cards = []
  }

  onCardSelected(card) {
    this.dispatchEvent(new CustomEvent("selected", { detail: card }))
  }
}
