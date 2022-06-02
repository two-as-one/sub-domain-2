import StateMachine from "javascript-state-machine"
import { Scene } from "./_Scene"

export class ExpeditionScene extends Scene {
  onEnterIntro() {
    if (this.game.player.health <= 0) {
      setTimeout(() => this.abandon(), 0)
    } else {
      this.chat.type("Choose where to go next")

      this.options = [
        { text: "Combat", fn: () => this.game.setScene("combat") },
        { text: "Oasis", fn: () => this.game.setScene("oasis") },
        { text: "Grow", fn: () => this.game.setScene("grow") },
        { text: "Multiply", fn: () => this.game.setScene("multiply") },
        { text: "Abandon expedition", fn: () => this.abandon() },
      ]
    }
  }

  onEnterDefeat() {
    this.chat.type("You head back to your ship.")
    this.options = []

    setTimeout(() => this.game.setScene("ship"), 2000)
  }
}

StateMachine.factory(ExpeditionScene, {
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
