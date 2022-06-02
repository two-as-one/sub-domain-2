import { html, css, LitElement } from "lit"
import { ChatMessage } from "./ChatMessage"

customElements.define("chat-message", ChatMessage)

export class ChatLog extends LitElement {
  static styles = css`
    :host {
      background-color: var(--main-color-background);
      border: 2px solid var(--main-color-foreground);
      box-sizing: border-box;
      padding: var(--spacing-3x);
      margin: var(--spacing-3x);
      flex-direction: column;
      overflow-y: auto;
      display: flex;
      height: calc(50vh - var(--spacing-3x) * 2);
      width: 500px;
    }
  `

  render() {
    return html`
      ${this.messages.map(
        (message) =>
          html`<chat-message
            text=${message.text}
            .options=${message.options}
          />`
      )}
    `
  }

  constructor() {
    super()
    this.messages = []
  }

  updated() {
    this.scrollTop = 0
  }

  type(text, options = {}) {
    this.messages.unshift({
      text,
      options,
    })

    this.messages.length = 100
    this.requestUpdate()
  }

  clear() {
    this.messages.length = 0
    this.requestUpdate()
  }
}
