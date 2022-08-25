import { html, css, LitElement } from "lit"

export class ChatOptions extends LitElement {
  static styles = css`
    :host {
      background-color: var(--main-color-background);
      box-sizing: border-box;
      color: var(--main-color-foreground);
      padding: 0;
      margin: var(--spacing-3x);
      flex-direction: column;
      display: flex;
      width: 500px;
    }

    ul {
      list-style: decimal;
      margin: 0;
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

  connectedCallback() {
    super.connectedCallback()
    addEventListener("keydown", this.onKeyDown)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener("keydown", this.onKeyDown)
  }

  constructor() {
    super()
    this.options = []

    this.onKeyDown = (e) => {
      const option = this.options[Number(e.key) - 1]
      if (option) {
        option.fn()
      }
    }
  }
}
