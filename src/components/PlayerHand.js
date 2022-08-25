import { html, css, LitElement } from "lit"
import { GameCard } from "./GameCard"
import { CardAnimator } from "./CardAnimator"
import { repeat } from "lit/directives/repeat.js"
import { classMap } from "lit/directives/class-map.js"
import { defineElement } from "../utils/defineElement"

defineElement("game-card", GameCard)
defineElement("card-animator", CardAnimator)

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
      left: 0;
      transform: translateY(350px);
      transition: transform 0.25s ease-in-out;
    }

    .hand.visible {
      transform: translateY(35px);
    }

    .card-focus {
      pointer-events: none;
      z-index: 3;
      position: absolute;
      top: -50px;
      left: var(--left);
      transform: scale(1.2);
    }
  `

  static properties = {
    game: { type: Object },
    isVisible: { state: true },
    cardFocus: { state: true },
  }

  render() {
    const classes = { hand: true, visible: this.isVisible }
    const cardsInHand = this.cards.filter((card) => card.inHand)
    return html`<div class=${classMap(classes)}>
      ${repeat(
        this.cards,
        (card) => card.id,
        (card) => {
          return html`<card-animator
            .index=${cardsInHand.indexOf(card)}
            .total=${cardsInHand.length}
            class="card-holder"
            @destroyed=${() => this.__destroy(card)}
            @mouseover=${(e) => this.#onCardOver(e, card)}
            @mouseout=${() => this.#onCardOut()}
          >
            <game-card
              .game=${this.game}
              .card=${card}
              @click=${() => this.onCardSelected(card)}
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
    </div> `
  }

  constructor() {
    super()
    this.cards = []
    this.deadCards = []
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

  #onCardOver(e, card) {
    this.cardFocus = { card, left: e.currentTarget.style.left }
  }

  #onCardOut() {
    this.cardFocus = null
  }

  animateDraw(card) {
    card.inHand = true
    this.cards.push(card)
    this.requestUpdate()
  }

  animateDiscard(card) {
    card.inHand = false
    this.shadowRoot
      .querySelectorAll("card-animator")
      .item(this.cards.indexOf(card))
      .discard()
    this.requestUpdate()
  }

  animatePlay(card) {
    card.inHand = false
    this.shadowRoot
      .querySelectorAll("card-animator")
      .item(this.cards.indexOf(card))
      .play()
    this.requestUpdate()
  }

  __destroy(card) {
    this.cards.splice(this.cards.indexOf(card), 1)
    this.requestUpdate()
  }
}
