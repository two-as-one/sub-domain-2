import { Scene } from "./_scene"
import StateMachine from "javascript-state-machine"
import { TextOption } from "../controls/controls"

export class Oasis extends Scene {
  constructor(game) {
    super(game)
    this._fsm()
  }

  onEnterIntro() {
    this.game.logger.type("You stumble upon a lush oasis.")
    this.game.controls.setOptions(
      new TextOption(`Nice! Time to relax.`, () => this.rest()),
    )
  }

  onEnterRest() {
    this.game.player.heal(this.game.player.maxHealth / 3)

    this.game.logger.type("You have a quick wank and a little nap.")
    this.game.controls.setOptions(
      new TextOption(`…`, () => this.game.setScene("expedition")),
    )
  }
}

StateMachine.factory(Oasis, {
  init: "intro",
  transitions: [
    { name: "start", from: "none", to: "intro" },
    { name: "rest", from: "intro", to: "rest" },
  ],
})

// To visualize this state machine:
// import visualize from "javascript-state-machine/lib/visualize"
// console.log(visualize(Combat))
// then copy and paste output to https://dreampuf.github.io/GraphvizOnline
