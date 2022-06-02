import StateMachine from "javascript-state-machine"
import { set } from "../../state/state"
import { Player } from "../../entities/player.entity"
import { Scene } from "./_Scene"

export class ShipScene extends Scene {
  onEnterIntro() {
    this.chat.type("You are at your stranded ship. What would you like to do?")

    this.options = [
      {
        text: "Go on an expedition",
        fn: () => this.game.setScene("expedition"),
      },
      {
        text: "Identotron-3000",
        fn: () => this.game.setScene("identotron"),
      },
    ]

    this.resetPlayer()
  }

  resetPlayer() {
    set("player.damage", 0)
    set("player.maxHealth", 60)
    set("player.deck", Player.starterDeck)
    this.game.player = new Player(this.game)
  }
}

StateMachine.factory(ShipScene, {
  init: "intro",
  transitions: [{ name: "start", from: "none", to: "intro" }],
})

// To visualize this state machine:
// import visualize from "javascript-state-machine/lib/visualize"
// console.log(visualize(Combat))
// then copy and paste output to https://dreampuf.github.io/GraphvizOnline
