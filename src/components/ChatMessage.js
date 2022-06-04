import { html, css, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"
import Typewriter from "typewriter-effect/dist/core"

export class ChatMessage extends LitElement {
  static styles = css`
    :host {
      margin: var(--spacing-1x) 0;
      color: var(--main-color-foreground);
    }

    .player {
      color: var(--main-color-strong);
    }

    .pink {
      color: var(--color-pink);
    }

    .blue {
      color: var(--color-blue);
    }

    .wavy {
      animation-name: wavy;
      animation-duration: 1.3s;
      animation-timing-function: ease;
      animation-iteration-count: infinite;
      position: relative;
      top: 0;
      left: 0;
    }

    @keyframes wavy {
      0% {
        top: 4px;
      }
      50% {
        top: -4px;
      }
      100% {
        top: 4px;
      }
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
    return html` <span class=${classMap(classes)}> </span> `
  }

  updated() {
    const typewriter = new Typewriter(
      this.shadowRoot.querySelector(".chat-message"),
      {
        delay: 16,
      }
    )

    typewriter
      .typeString(this.text)
      .callFunction(function (state) {
        state.elements.cursor.style.display = "none"
      })
      .start()
  }

  constructor() {
    super()
    this.typeEffect = false
  }

  static wavy(text = "") {
    return text
      .split("")
      .map((letter) => `<span class="letter wavy">${letter}</span>`)
      .join("")
  }

  static pink(text = "") {
    return `<span class="pink">${text}</span>`
  }

  static blue(text = "") {
    return `<span class="blue">${text}</span>`
  }

  static bold(text = "") {
    return `<strong>${text}</strong>`
  }
}
