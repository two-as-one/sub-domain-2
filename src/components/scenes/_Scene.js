import { html, css, LitElement } from "lit"
import { ChatLog } from "../ChatLog"
import { ChatOptions } from "../ChatOptions"
import { ref, createRef } from "lit/directives/ref.js"
import { defineElement } from "../../utils/defineElement"
import { CharacterSheet } from "../CharacterSheet"
import { SlidePanel } from "../SlidePanel"
import { CardDeck } from "../CardDeck"
import { get } from "../../state/state"
import { cardFactory } from "../../cards/factory"

defineElement("chat-log", ChatLog)
defineElement("chat-options", ChatOptions)
defineElement("character-sheet", CharacterSheet)
defineElement("slide-panel", SlidePanel)
defineElement("card-deck", CardDeck)

export class Scene extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    .viewport {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 1;
    }

    card-deck {
      flex-grow: 1;
      z-index: 2;
    }

    .character-sheet {
      z-index: 3;
    }

    .controls {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      background-color: var(--color-black);
    }

    .controls button {
      border: 2px solid var(--color-yellow);
      background-color: var(--color-black);
      color: var(--color-yellow);
      margin: var(--spacing-1x);
      padding: var(--spacing-1x);
      cursor: pointer;
    }
  `

  static properties = {
    game: { type: Object },
    options: { state: true },
    drawPileCount: { state: true },
    discardPileCount: { state: true },
  }

  $characterSheet = createRef()
  $characterSheetPanel = createRef()
  $playArea = createRef()

  constructor() {
    super()
    this.options = []
    this.drawPileCount = 0
    this.discardPileCount = 0
  }

  connectedCallback() {
    super.connectedCallback()
    this.__deck = this.player.createDeck()
    this.__cards = [
      ...get("player.deck").map((card) => cardFactory(this.game, card)),
    ]
  }

  firstUpdated() {
    this._fsm()
  }

  render() {
    return html`
      <section class="controls">
        <button @click=${() => this.$characterSheetPanel.value.toggle()}>
          Character
        </button>
      </section>
      <section class="viewport">
        <chat-log></chat-log>
        <chat-options .options=${this.options}></chat-options>
      </section>

      <card-deck
        .game=${this.game}
        .cards=${this.__cards}
        ${ref(this.$playArea)}
        @cardUsed=${this.onCardUsed}
      ></card-deck>

      <slide-panel ${ref(this.$characterSheetPanel)}>
        <character-sheet
          .game=${this.game}
          ${ref(this.$characterSheet)}
          .cards=${this.__deck.__cards}
          sort="type"
          class="left"
        ></character-sheet>
      </slide-panel>
    `
  }

  get player() {
    return this.game.player
  }

  get hand() {
    return this.$playArea?.value.hand
  }

  get deck() {
    return this.$playArea?.value
  }

  get chat() {
    return this.shadowRoot.querySelector("chat-log")
  }

  onCardUsed(e) {
    console.log(e)
  }
}
