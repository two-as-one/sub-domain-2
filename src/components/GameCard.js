import { html, css, LitElement } from "lit"
import { unsafeHTML } from "lit/directives/unsafe-html.js"

export class GameCard extends LitElement {
  static styles = css`
    :host {
      --border-color: var(--color-yellow);

      background-color: var(--color-black);
      border-radius: 6px;
      border: 2px solid var(--border-color);
      box-shadow: 0 0 2px 4px var(--color-black);
      box-sizing: border-box;
      color: var(--color-yellow);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      font-size: var(--font-size-medium);
      margin: 0;
      position: relative;
      top: 0;
      transform: scale(1) translateY(0);
      transition: transform 0.1s linear, top 0.1s linear;
      width: 200px;
    }

    h1 {
      font-size: 1rem;
      margin: 0;
      padding: 8px 8px 0 8px;
      text-align: left;
      text-transform: uppercase;
    }

    .art {
      border: 2px solid var(--color-yellow);
      height: 100px;
      margin: 8px 8px 0 8px;
      background-color: var(--color-yellow);
      box-sizing: border-box;
      position: relative;
    }

    .image {
      width: 200px;
      height: 120px;
      position: relative;
      top: -12px;
      left: -12px;
    }

    .description {
      border: 2px dashed var(--color-yellow);
      flex-grow: 1;
      height: 100px;
      margin: 8px;
      padding: 8px;
    }

    legend {
      font-size: 1rem;
      margin: auto;
      text-transform: capitalize;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    strong {
      color: var(--color-white);
    }

    .blue {
      color: var(--color-blue);
    }
    .pink {
      color: var(--color-pink);
    }

    .tooltips {
      background-color: var(--main-color-background);
      border-radius: 6px;
      border: 2px solid var(--main-color-foreground);
      box-shadow: 0 0 2px 4px var(--main-color-background);
      left: 200px;
      list-style: none;
      margin: 0 8px;
      padding: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      width: 150px;
      transition: opacity 0s;
      opacity: 0;
    }

    .tooltips li {
      padding: 8px;
    }

    .tooltips li + li {
      border-top: 1px solid var(--main-color-foreground);
    }

    :host(:hover) {
      transform: scale(1.1);
    }

    :host(:hover) .tooltips,
    .tooltips.visible {
      opacity: 1;
      transition: opacity 0.1s linear 0.3s;
    }
  `

  static properties = {
    game: { type: Object },
    card: { type: Object },
    showTooltip: { type: Boolean },
  }

  render() {
    const tooltips = [
      ...new Set(this.card.effects.map((effect) => effect.tooltips).flat()),
    ]

    const colors = this.card.effects.map((effect) => effect.color)
    if (colors.includes("pink")) {
      this.style.setProperty("--border-color", "var(--color-pink)")
    }
    if (colors.includes("blue")) {
      this.style.setProperty("--border-color", "var(--color-blue)")
    }

    return html`
      <h1 class="title">${this.card.title}</h1>
      <div class="art">
        ${this.card.image
          ? html`<img class="image" src=${this.card.image} />`
          : ""}
      </div>
      <fieldset class="description">
        <legend class="source">&lt;${this.card.type}&gt;</legend>
        <section>
          <ul>
            ${this.card.effects.map(
              (effect) => html`<li>${unsafeHTML(effect.description)}</li>`
            )}
          </ul>
        </section>
      </fieldset>
      ${tooltips.length > 0
        ? html` <section class="tooltips ${this.showTooltip ? "visible" : ""}">
            ${tooltips.map((tooltip) => html`<li>${unsafeHTML(tooltip)}</li>`)}
          </section>`
        : ""}
    `
  }

  constructor() {
    super()
  }

  #onCardStateChanged = () => {
    this.requestUpdate()
  }

  connectedCallback() {
    super.connectedCallback()
    this.game.addEventListener("cardStateChanged", this.#onCardStateChanged)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener("cardStateChanged", this.#onCardStateChanged)
  }
}
