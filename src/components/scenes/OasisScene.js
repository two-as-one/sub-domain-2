import StateMachine from "javascript-state-machine"
import { Scene } from "./_Scene"

export class OasisScene extends Scene {
  onEnterIntro() {
    this.chat.type("You stumble upon a lush oasis.")
    this.options = [{ text: `Nice! Time to relax.`, fn: () => this.rest() }]
  }

  onEnterRest() {
    this.game.player.heal(this.game.player.maxHealth / 3)

    this.chat.type("You have a quick wank and a little nap.")
    this.options = [{ text: `…`, fn: () => this.game.setScene("expedition") }]
  }
}

StateMachine.factory(OasisScene, {
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
