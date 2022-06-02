import { html, css, LitElement } from "lit"

export class GameCard extends LitElement {
  static styles = css`
    :host {
      --card-rotation: 0;
      background-color: var(--main-color-background);
      border-radius: 6px;
      border: 2px solid var(--main-color-foreground);
      box-shadow: 0 0 2px 4px var(--main-color-background);
      color: var(--main-color-foreground);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      font-size: var(--font-size-medium);
      height: 300px;
      margin: 0 -24px;
      position: relative;
      position: relative;
      top: 0;
      transform: scale(1) translateY(0);
      transition: transform 0.1s linear, top 0.1s linear;
      width: 200px;
    }

    h1 {
      font-size: 1rem;
      margin: 0;
      padding: 8px 8px 0 16px;
      text-align: left;
      text-transform: uppercase;
    }

    .art {
      border: 2px solid var(--main-color-foreground);
      height: 100px;
      margin: 8px 8px 0 8px;
      background-color: var(--color-yellow);
    }

    .description {
      border: 2px dashed var(--main-color-foreground);
      flex-grow: 1;
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
    }

    .effect.blue {
      color: var(--color-blue);
    }
    .effect.pink {
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
      width: 250px;
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
      transform: scale(1.1) translateY(-40px);
    }

    :host(:hover) .tooltips {
      opacity: 1;
      transition: opacity 0.1s linear 0.3s;
    }
  `

  static properties = {
    card: {
      type: Object,
    },
  }

  render() {
    const tooltips = [
      ...new Set(this.card.effects.map((effect) => effect.tooltips).flat()),
    ]

    return html`
      <h1 class="title">${this.card.title}</h1>
      <div class="art"></div>
      <fieldset class="description">
        <legend class="source">&lt;${this.card.type}&gt;</legend>
        <section>
          <ul>
            ${this.card.effects.map(
              (effect) => html`<li>${effect.description}</li>`
            )}
          </ul>
        </section>
      </fieldset>
      ${tooltips.length > 0
        ? html` <section class="tooltips">
            ${tooltips.map((tooltip) => html`<li>${tooltip}</li>`)}
          </section>`
        : ""}
    `
  }

  constructor() {
    super()
  }
}
