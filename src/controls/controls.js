import { html, render } from "lit-html"
import "./controls.sass"

export class Controls {
  constructor(game) {
    this.game = game
    this.options = []
    this.el = document.createElement("section")
    this.el.classList.add("controls")
  }

  addOption(item, handler) {
    this.options.push(new Option(item, handler))
    this.render()
  }

  clearOptions() {
    this.options.length = 0
    this.render()
  }

  selectOption(index) {
    this.options[index].handler()
  }

  render() {
    render(template(this), this.el)
  }
}

class Option {
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
          ${i + 1}. ${option.item.template ? option.item.template : option.item}
        </li>`,
    )}
  </ul>
`
