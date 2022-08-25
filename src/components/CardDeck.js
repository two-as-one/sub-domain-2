import { html, css, LitElement } from "lit"
import { ref, createRef } from "lit/directives/ref.js"
import { defineElement } from "../utils/defineElement"
import { repeat } from "lit/directives/repeat.js"
import { CardAnimator } from "./CardAnimator"
import { CardList } from "./CardList"
import { CardPile } from "./CardPile"
import { GameCard } from "./GameCard"
import { SlidePanel } from "./SlidePanel"

defineElement("card-animator", CardAnimator)
defineElement("card-list", CardList)
defineElement("card-pile", CardPile)
defineElement("game-card", GameCard)
defineElement("slide-panel", SlidePanel)

export class CardDeck extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: var(--spacing-2x);
      align-items: flex-end;
    }

    card-pile {
      z-index: 2;
    }

    .player-hand {
      align-items: center;
      bottom: 0;
      display: flex;
      flex-direction: row;
      height: 300px;
      justify-content: center;
      left: 0;
      position: relative;
      transform: translateY(350px);
      transition: transform 0.25s ease-in-out;
      width: 500px;
      z-index: 1;
    }

    .player-hand.visible {
      transform: translateY(35px);
    }

    .card-focus {
      pointer-events: none;
      z-index: 50;
      position: absolute;
      top: -50px;
      left: var(--left);
      transform: scale(1.2);
    }
  `

  static properties = {
    game: { type: Object },
    cards: { type: Array },
    showHand: { state: true },
    cardFocus: { state: true },
    __deck: { state: true },
    __hand: { state: true },
    __discard: { state: true },
  }

  $hand = createRef()
  $deck = createRef()
  $discard = createRef()
  $discardPanel = createRef()
  $deckPanel = createRef()

  render() {
    return html`
      <card-pile
        .game=${this.game}
        size=${this.__deck.length}
        @click=${() => this.toggleDeckPanel()}
      ></card-pile>

      <div class="player-hand ${this.showHand ? "visible" : ""}">
        ${repeat(
          this.cards,
          (card) => card.id,
          (card) => {
            return html`<card-animator
              .index=${this.__hand.indexOf(card)}
              .total=${this.__hand.length}
              .location=${this.__hand.includes(card)
                ? "hand"
                : this.__discard.includes(card)
                ? "discard"
                : this.__deck.includes(card)
                ? "deck"
                : "aether"}
              class="card-holder"
              @mouseover=${(e) => this.#onCardOver(e, card)}
              @mouseout=${() => this.#onCardOut()}
            >
              <game-card
                .game=${this.game}
                .card=${card}
                @click=${() =>
                  this.dispatchEvent(
                    new CustomEvent("cardUsed", { detail: card })
                  )}
              ></game-card>
            </card-animator>`
          }
        )}
        ${this.cardFocus
          ? html`
              <div class="card-focus" style=${`--left:${this.cardFocus.left}`}>
                <game-card
                  .game=${this.game}
                  .card=${this.cardFocus.card}
                  .showTooltip=${true}
                ></game-card>
              </div>
            `
          : ""}
      </div>

      <card-pile
        .game=${this.game}
        size=${this.__discard.length}
        @click=${() => this.toggleDiscardPanel()}
      ></card-pile>

      <slide-panel class="left" ${ref(this.$deckPanel)}>
        <card-list
          .game=${this.game}
          .cards=${this.__deck}
          sort="type"
        ></card-list>
      </slide-panel>

      <slide-panel class="right" ${ref(this.$discardPanel)}>
        <card-list .game=${this.game} .cards=${this.__discard}></card-list>
      </slide-panel>
    `
  }

  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()

    this.__deck = [...this.cards]
    this.__hand = []
    this.__discard = []

    this.shuffle()
  }

  #onCardOver(e, card) {
    this.cardFocus = { card, left: e.currentTarget.style.left }
  }

  #onCardOut() {
    this.cardFocus = null
  }

  toggleDeckPanel() {
    if (this.__deck.length > 0) {
      this.$deckPanel.value.toggle()
    }
  }

  toggleDiscardPanel() {
    if (this.__discard.length > 0) {
      this.$discardPanel.value.toggle()
    }
  }

  /** draw a random card from the deck */
  async draw(card) {
    // shuffle the discard pile into the deck if it's empty
    if (this.__deck.length < 1) {
      await this.shuffle()
      await new Promise((r) => setTimeout(r, 750))
    }

    if (this.__deck.length < 1) {
      return
    }

    if (!card) {
      card = this.game.chance.pickone(this.__deck)
    }

    if (card) {
      this.__deck = [...this.__deck.filter((c) => c !== card)]
      this.__hand = [...this.__hand, card]
    }

    return card
  }

  /** discard a card from hand */
  async discard(card = this.__hand[this.__hand.length - 1]) {
    if (this.__hand.includes(card)) {
      this.__hand = [...this.__hand.filter((c) => c !== card)]

      await this.shadowRoot
        .querySelectorAll("card-animator")
        .item(this.cards.indexOf(card))
        .discard()

      this.__discard = [...this.__discard, card]
    }
  }

  /** play a card */
  async play(card) {
    if (this.__hand.includes(card)) {
      this.__hand = [...this.__hand.filter((c) => c !== card)]

      await this.shadowRoot
        .querySelectorAll("card-animator")
        .item(this.cards.indexOf(card))
        .play()

      this.__discard = [...this.__discard, card]
    }
  }

  /** shuffle the discard back into the deck */
  async shuffle() {
    while (this.__discard.length > 0) {
      const card = this.__discard[0]
      this.__discard = [...this.__discard.filter((c) => c !== card)]

      this.shadowRoot
        .querySelectorAll("card-animator")
        .item(this.cards.indexOf(card))
        .shuffle()

      this.__deck = this.game.chance.shuffle([...this.__deck, card])

      await new Promise((r) => setTimeout(r, 100))
    }
  }
}
