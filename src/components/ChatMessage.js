import { html, css, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"

export class ChatMessage extends LitElement {
  static styles = css`
    :host {
      margin: var(--spacing-1x) 0;
      color: var(--main-color-foreground);
    }

    .player {
      color: var(--main-color-strong);
    }
  `

  static properties = {
    text: { type: String },
    options: { type: Object },
  }

  render() {
    const classes = {
      "player": this.options.source === "player",
      "chat-message": true,
    }
    return html` <span class=${classMap(classes)}> ${this.text} </span> `
  }

  constructor() {
    super()
  }
}
