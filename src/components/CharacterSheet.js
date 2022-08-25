import { html, css, LitElement } from "lit"
import { GameCard } from "./GameCard"
import { repeat } from "lit/directives/repeat.js"
import { defineElement } from "../utils/defineElement"

defineElement("game-card", GameCard)

export class CharacterSheet extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .body,
    .skills {
      flex-grow: 1;
    }

    .chest,
    .groin {
      display: flex;
      flex-direction: row;
    }

    game-card {
      z-index: 1;
    }

    game-card:hover {
      z-index: 2;
    }
  `

  static properties = {
    game: { type: Object },
    cards: { type: Array },
  }

  render() {
    const cards = [...this.cards]
    const skills = cards.filter((card) => card.type === "skill")
    const chest = []
    const groin = []

    skills.sort((a, b) => (a.name < b.name ? -1 : 1))

    chest.push(...cards.filter((card) => card.key === "boobs"))

    groin.push(...cards.filter((card) => card.key === "cock"))
    groin.push(...cards.filter((card) => card.key === "balls"))
    groin.push(...cards.filter((card) => card.key === "pussy"))
    groin.push(...cards.filter((card) => card.key === "anus"))

    return html`
      <section class="body">
        <section class="chest">
          ${repeat(
            chest,
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
        </section>
        <section class="groin">
          ${repeat(
            groin,
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
        </section>
      </section>
      <section class="skills">
        ${repeat(
          skills,
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
      </section>
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
