import { html, css, LitElement } from "lit"

export class CardPile extends LitElement {
  static styles = css`
    :host {
      --card-height: 165px;
      --card-aspect-ratio: 40 / 55;
      margin: 4px;
      cursor: pointer;
      height: var(--card-height);
      aspect-ratio: var(--card-aspect-ratio);
      position: relative;
    }

    .card {
      height: var(--card-height);
      aspect-ratio: var(--card-aspect-ratio);
      background-color: var(--color-black);
      border-radius: 6px;
      border: 2px solid var(--color-yellow);
      box-shadow: 0 0 2px 3px var(--color-black);
      position: relative;
      box-sizing: border-box;
    }

    .card--phantom {
      border-style: dashed;
      opacity: 0.5;
      cursor: default;
    }
  `

  static properties = {
    game: { type: Object },
    size: { type: Number },
  }

  render() {
    const cards = []
    const size = this.size || 1
    for (let i = 0; i < size; i++) {
      cards.push(
        html`<div
          class="card ${this.size === 0 ? "card--phantom" : ""}"
          style="top: calc((var(--card-height) + 5px) * -${i})"
        ></div>`
      )
    }
    return html` ${cards} `
  }

  constructor() {
    super()
    this.size = 1
  }
}
