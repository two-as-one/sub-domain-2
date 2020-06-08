import { Logger } from "../logger/logger"
import { Controls } from "../controls/controls"
import { Window } from "../window/window"
import { html, render } from "lit-html"
import "./game.sass"
import { Combat } from "../scenes/combat"
import Chance from "chance"
import { Player } from "../entities/player.entity"
import { save } from "../state/state"
export class Game {
  constructor() {
    this.logger = new Logger(this)
    this.controls = new Controls(this)
    this.window = new Window(this)
    this.chance = new Chance()
    this.player = new Player(this)

    Player.newPlayerDeck(
      this.chance.pickone(["fighter", "lover"]),
      this.chance.pickone(["male", "female"]),
    )

    this.render()
    this.setScene()
  }

  setScene() {
    if (this.scene) {
      this.scene.unload()
    }

    this.player.__damage = 0
    this.scene = new Combat(this)
  }

  endScene() {
    this.setScene()
  }

  save() {
    save()
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
