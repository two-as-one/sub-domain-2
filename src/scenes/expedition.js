import { Scene } from "./_scene"
import StateMachine from "javascript-state-machine"
import { TextOption } from "../controls/controls"

export class Expedition extends Scene {
  constructor(game) {
    super(game)
    this._fsm()
  }

  onEnterIntro() {
    if (this.game.player.health <= 0) {
      setTimeout(() => this.abandon(), 0)
    } else {
      this.game.logger.type("Choose where to go next")
      this.game.controls.setOptions(
        new TextOption("Combat", () => this.game.setScene("combat")),
        new TextOption("Oasis", () => this.game.setScene("oasis")),
        new TextOption("Abandon expedition", () => this.abandon()),
      )
    }
  }

  onEnterDefeat() {
    this.game.logger.type("You head back to your ship.")
    this.game.controls.clearOptions()
    setTimeout(() => this.game.setScene("ship"), 2000)
  }
}

StateMachine.factory(Expedition, {
  init: "intro",
  transitions: [
    { name: "start", from: "none", to: "intro" },
    { name: "abandon", from: "intro", to: "defeat" },
  ],
})

// To visualize this state machine:
// import visualize from "javascript-state-machine/lib/visualize"
// console.log(visualize(Combat))
// then copy and paste output to https://dreampuf.github.io/GraphvizOnline
