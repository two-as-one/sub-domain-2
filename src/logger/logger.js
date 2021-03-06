import { html, render } from "lit-html"
import Typewriter from "cool-typewriter"
import "./logger.sass"

export class Logger {
  constructor(/** @type import("./../game/game").Game*/ game) {
    this.game = game
    this.typewriter = new Typewriter()
    this.logs = []
    this.el = document.createElement("section")
    this.el.classList.add("logger")
  }

  type(text, options) {
    this.typewriter.complete()

    this.logs.push(new Log(text, options))

    while (this.logs.length > 100) {
      this.logs.shift()
    }

    this.render()
    this.el.scrollTop = this.el.scrollHeight

    const logs = this.el.querySelectorAll(".log")
    this.typewriter.type(logs.item(logs.length - 1))
    this.typewriter.start()
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

  get classList() {
    return this.options.source
  }
}

const template = logger => html`
  <ul class="logs">
    ${logger.logs.map(
      log => html`<li class="log ${log.classList}">${log.message}</li>`,
    )}
  </ul>
`
