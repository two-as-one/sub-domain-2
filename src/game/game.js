import { Logger } from "../logger/logger"
import { Controls } from "../controls/controls"
import { Window } from "../window/window"
import { html, render } from "lit-html"
import "./game.sass"
import Chance from "chance"
import { Player } from "../entities/player.entity"
import { save, define, get, set } from "../state/state"
import { Combat } from "../scenes/combat"
import { Oasis } from "../scenes/oasis"
import { Expedition } from "../scenes/expedition"
import { CharacterCreation } from "../scenes/character-creation"

define("game.state", "character-creation")
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

  setScene(name = get("game.state")) {
    if (this.scene) {
      this.scene.unload()
    }

    set("game.state", name)
    save()

    switch (name) {
      case "character-creation":
        this.scene = new CharacterCreation(this)
        break
      case "combat":
        this.scene = new Combat(this)
        break
      case "oasis":
        this.scene = new Oasis(this)
        break
      case "expedition":
        this.scene = new Expedition(this)
        break
    }
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
