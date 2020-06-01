import { html, render } from "lit-html"
import "./controls.sass"

export class Controls {
  constructor(/** @type import("./../game/game").Game*/ game) {
    this.game = game
    this.options = []
    this.el = document.createElement("section")
    this.el.classList.add("controls")
    this.__type = ""
  }

  clearOptions() {
    this.options.length = 0
    this.render()
  }

  selectOption(index) {
    this.options[index].handler()
  }

  set type(val) {
    if (this.__type) {
      this.el.classList.remove(this.__type)
    }
    if (val) {
      this.el.classList.add(val)
    }
    this.__type = val
  }

  setOptions(type, ...options) {
    this.type = type
    this.clearOptions()
    this.options.push(...options)
    this.render()
  }

  render() {
    render(template(this), this.el)
  }
}

export class Option {
  constructor(item, handler = () => {}) {
    this.item = item
    this.handler = handler
  }
}

const template = controls => html`
  <ul class="options">
    ${controls.options.map(
      (option, i) =>
        html`<li class="option" @click="${() => controls.selectOption(i)}">
          ${option.item.template ? option.item.template : option.item}
        </li>`,
    )}
  </ul>
`
