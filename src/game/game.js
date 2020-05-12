import { Logger } from "../logger/logger"
import { Controls } from "../controls/controls"
import { Window } from "../window/window"
import { html, render } from "lit-html"
import "./game.sass"

export class Game {
  constructor() {
    this.logger = new Logger(this)
    this.controls = new Controls(this)
    this.window = new Window(this)

    this.render()
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
    this.logger.type("hello world")
  }

  render() {
    render(template(this), document.body)
    document.getElementById("top").appendChild(this.logger.el)
    document.getElementById("top").appendChild(this.window.el)
    document.getElementById("bottom").appendChild(this.controls.el)
  }
}

const template = () => html`
  <section id="game">
    <section id="top"></section>
    <section id="bottom"></section>
  </section>
`
