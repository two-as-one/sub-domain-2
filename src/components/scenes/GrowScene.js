import StateMachine from "javascript-state-machine"
import { set } from "../../state/state"
import { ChatMessage } from "../ChatMessage"
import { Scene } from "./_Scene"

export class GrowScene extends Scene {
  onCardUsed(e) {
    this.apply(e.detail)
  }

  onEnterIntro() {
    this.chat.type(
      `You find a vial of ${ChatMessage.pink(
        ChatMessage.bold("growth serum")
      )}.`
    )

    this.options = [
      { text: `Use it.`, fn: () => this.use() },
      { text: `Ignore it.`, fn: () => this.game.setScene("expedition") },
    ]

    this.viableCards = this.deck.cards
      .filter((card) => card.type === "body")
      .filter((card) => card.level < card.levels.length - 1)
  }

  async onEnterUse() {
    if (this.viableCards.length) {
      this.chat.type("Which body part do you want to use it on?")

      this.deck.showHand = true

      while (this.viableCards.length) {
        await new Promise((r) => setTimeout(r, 250))
        const card = this.viableCards.shift()
        this.deck.draw(card)
      }
      this.options = []
    } else {
      this.chat.type("You don't have any applicable body parts.")
      this.options = [{ text: `…`, fn: () => this.game.setScene("expedition") }]
    }
  }

  onEnterApply(transition, card) {
    const previousName = card.title
    card.level += 1
    this.chat.type(`Your ${previousName} became ${card.title}!`)
    this.options = [{ text: `…`, fn: () => this.game.setScene("expedition") }]
    this.showHand = false

    set(
      "player.deck",
      this.deck.cards.map((card) => card.fingerprint)
    )
  }
}

StateMachine.factory(GrowScene, {
  init: "intro",
  transitions: [
    { name: "start", from: "none", to: "intro" },
    { name: "use", from: "intro", to: "use" },
    { name: "apply", from: "use", to: "apply" },
  ],
})

// To visualize this state machine:
// import visualize from "javascript-state-machine/lib/visualize"
// console.log(visualize(Combat))
// then copy and paste output to https://dreampuf.github.io/GraphvizOnline
