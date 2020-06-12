import { Scene } from "./_scene"
import StateMachine from "javascript-state-machine"
import { TextOption } from "../controls/controls"

export class Expedition extends Scene {
  constructor(game) {
    super(game)
    this._fsm()
  }

  onEnterIntro() {
    this.game.logger.type("Choose where to go")
    this.game.controls.setOptions(
      new TextOption(`Combat`, () => this.game.setScene("combat")),
      new TextOption(`Oasis`, () => this.game.setScene("oasis")),
    )
  }
}

StateMachine.factory(Expedition, {
  init: "intro",
  transitions: [{ name: "start", from: "none", to: "intro" }],
})

// To visualize this state machine:
// import visualize from "javascript-state-machine/lib/visualize"
// console.log(visualize(Combat))
// then copy and paste output to https://dreampuf.github.io/GraphvizOnline
