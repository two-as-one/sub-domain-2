import { html, render } from "lit-html"
import "./controls.sass"

export class Controls {
  constructor(/** @type import("./../game/game").Game*/ game) {
    this.game = game
    this.options = []
    this.el = document.createElement("section")
    this.el.classList.add("controls")
  }

  clearOptions() {
    this.options.length = 0
    this.render()
  }

  selectOption(index) {
    this.options[index].handler()
  }

  setOptions(...options) {
    this.clearOptions()
    this.options.push(...options)
    this.render()
  }

  get type() {
    const types = this.options.map(option => option.type)
    if (types.every(t => t === "card")) {
      return "cards"
    } else if (types.every(t => t === "text")) {
      return "text"
    } else {
      return "mixed"
    }
  }

  render() {
    render(this.template(this), this.el)
  }

  get template() {
    return () => html`
      <ul class="options ${this.type}">
        ${this.options.map(option => option.template)}
      </ul>
    `
  }
}

class Option {
  constructor(item, handler = () => {}) {
    this.item = item
    this.handler = handler
  }

  select() {
    this.handler()
  }
}

export class TextOption extends Option {
  get type() {
    return "text"
  }

  get template() {
    return html`<li class="option" @click="${() => this.select()}">
      ${this.item}
    </li>`
  }
}

export class CardOption extends Option {
  get type() {
    return "card"
  }

  get template() {
    return html`<li class="option card" @click="${() => this.select()}">
      ${this.item.template}
    </li>`
  }
}
