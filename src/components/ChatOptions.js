import { html, css, LitElement } from "lit"

export class ChatOptions extends LitElement {
  static styles = css`
    :host {
      background-color: var(--main-color-background);
      box-sizing: border-box;
      color: var(--main-color-foreground);
      padding: var(--spacing-3x);
      margin: var(--spacing-3x);
      flex-direction: column;
      display: flex;
      height: calc(50vh - var(--spacing-3x) * 2);
      width: 500px;
    }

    ul {
      list-style: decimal;
    }

    li {
      cursor: pointer;
      margin: var(--spacing-2x) 0;
    }

    li:hover {
      color: var(--main-color-strong);
    }
  `

  static properties = {
    options: { type: Array },
  }

  render() {
    return html`
      <ul>
        ${this.options.map(
          (option) => html`<li @click=${() => option.fn()}>${option.text}</li>`
        )}
      </ul>
    `
  }

  constructor() {
    super()
    this.options = []
  }
}
