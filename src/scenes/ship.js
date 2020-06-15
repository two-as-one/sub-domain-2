import { Scene } from "./_scene"
import StateMachine from "javascript-state-machine"
import { TextOption } from "../controls/controls"
import { set } from "../state/state"
import { Player } from "../entities/player.entity"

export class Ship extends Scene {
  constructor(game) {
    super(game)
    this._fsm()
  }

  onEnterIntro() {
    this.resetPlayer()

    this.game.logger.type(
      "You are at your stranded ship. What would you like to do?",
    )
    this.game.controls.setOptions(
      new TextOption("Go on an expedition", () =>
        this.game.setScene("expedition"),
      ),
      new TextOption("Identotron-3000", () => this.game.setScene("identotron")),
    )
  }

  resetPlayer() {
    set("player.damage", 0)
    set("player.maxHealth", 60)
    this.game.player = new Player(this.game)
  }
}

StateMachine.factory(Ship, {
  init: "intro",
  transitions: [{ name: "start", from: "none", to: "intro" }],
})

// To visualize this state machine:
// import visualize from "javascript-state-machine/lib/visualize"
// console.log(visualize(Combat))
// then copy and paste output to https://dreampuf.github.io/GraphvizOnline
