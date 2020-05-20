import { Logger } from "../logger/logger"
import { Controls } from "../controls/controls"
import { Window } from "../window/window"
import { html, render } from "lit-html"
import "./game.sass"
import { Combat } from "../scenes/combat"
import Chance from "chance"
import { Player } from "../entities/player.entity"

export class Game {
  constructor() {
    this.logger = new Logger(this)
    this.controls = new Controls(this)
    this.window = new Window(this)
    this.chance = new Chance()
    this.player = new Player(this)

    this.render()
    this.setScene()
  }

  setScene() {
    if (this.scene) {
      this.scene.unload()
    }

    this.scene = new Combat(this)
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
