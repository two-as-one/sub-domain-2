import { html, render } from "lit-html"
import Typewriter from "cool-typewriter"
import "./logger.sass"

export class Logger {
  constructor(game) {
    this.game = game
    this.typewriter = new Typewriter()
    this.logs = []
    this.options = []
    this.el = document.createElement("section")
    this.el.classList.add("logger")
  }

  type(text) {
    this.typewriter.complete()

    this.logs.push(new Log(text))

    while (this.logs.length > 100) {
      this.logs.shift()
    }

    this.render()
    this.el.scrollTop = this.el.scrollHeight

    const logs = this.el.querySelectorAll(".log")
    this.typewriter.type(logs.item(logs.length - 1))
    this.typewriter.start()
  }

  addOption(text, handler) {
    this.options.push(new Option(text, handler))
  }

  clearOptions() {
    this.options.length = 0
  }

  selectOption(index) {
    this.options[index].handler()
  }

  render() {
    render(template(this), this.el)
  }
}

class Log {
  constructor(message, options = {}) {
    this.message = message
    this.options = options
  }
}

class Option {
  constructor(message, handler = () => {}) {
    this.message = message
    this.handler = handler
  }
}

const template = logger => html`
  <ul class="logs">
    ${logger.logs.map(log => html`<li class="log">${log.message}</li>`)}
  </ul>
  <ul class="options">
    ${logger.options.map(
      (option, i) =>
        html`<li class="option" @click="${() => logger.selectOption(i)}">
          ${i + 1}. ${option.message}
        </li>`,
    )}
  </ul>
`
