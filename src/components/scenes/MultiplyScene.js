import StateMachine from "javascript-state-machine"
import { cardFactory } from "../../cards/factory"
import { set } from "../../state/state"
import { ChatMessage } from "../ChatMessage"
import { Scene } from "./_Scene"

export class MultiplyScene extends Scene {
  onCardUsed(e) {
    this.apply(e.detail)
  }

  onEnterIntro() {
    this.chat.type(
      `You find a vial of ${ChatMessage.bold(
        ChatMessage.pink("multiply serum")
      )}.`
    )
    this.options = [
      { text: `Use it.`, fn: () => this.use() },
      { text: `Ignore it.`, fn: () => this.game.setScene("expedition") },
    ]

    this.viableCards = this.deck.cards.filter((card) => card.type === "body")
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
    this.deck.cards.push(cardFactory(this.game, card.fingerprint))
    this.chat.type(`You have grown and extra ${card.title}!`)
    this.options = [{ text: `…`, fn: () => this.game.setScene("expedition") }]
    this.showHand = false

    set(
      "player.deck",
      this.deck.cards.map((card) => card.fingerprint)
    )
  }
}

StateMachine.factory(MultiplyScene, {
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
