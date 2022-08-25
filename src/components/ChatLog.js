import { html, css, LitElement } from "lit"
import { ChatMessage } from "./ChatMessage"
import { repeat } from "lit/directives/repeat.js"
import { defineElement } from "../utils/defineElement"

defineElement("chat-message", ChatMessage)

let i = 0
export class ChatLog extends LitElement {
  static styles = css`
    :host {
      background-color: var(--main-color-background);
      border: 2px solid var(--main-color-foreground);
      box-sizing: border-box;
      display: flex;
      flex-direction: column-reverse;
      height: 300px;
      justify-content: flex-end;
      margin: var(--spacing-3x);
      overflow-y: auto;
      padding: var(--spacing-3x);
      width: 500px;
    }
  `

  render() {
    return html`
      ${repeat(
        this.messages,
        (message) => message.id,
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
    this.messages.push({
      id: i,
      text,
      options,
    })

    i++

    while (this.messages.length > 100) {
      this.messages.shift()
    }

    this.requestUpdate()
  }

  clear() {
    this.messages.length = 0
    this.requestUpdate()
  }
}
