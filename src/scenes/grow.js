import { Scene } from "./_scene"
import StateMachine from "javascript-state-machine"
import { TextOption, CardOption } from "../controls/controls"
import { set } from "../state/state"

export class Grow extends Scene {
  constructor(game) {
    super(game)
    this._fsm()
  }

  onEnterIntro() {
    this.game.logger.type("You find a vial of growth serum.")
    this.game.controls.setOptions(
      new TextOption(`Use it.`, () => this.use()),
      new TextOption(`Ignore it.`, () => this.game.setScene("expedition")),
    )

    this.deck = this.game.player.createDeck()
    this.viableCards = this.deck.cards
      .filter(card => card.type === "body")
      .filter(card => card.level < card.levels.length - 1)
  }

  onEnterUse() {
    if (this.viableCards.length) {
      this.game.logger.type("Which body part do you want to use it on?")
      this.game.controls.setOptions(
        ...this.viableCards.map(
          card => new CardOption(card, () => this.apply(card)),
        ),
      )
    } else {
      this.game.logger.type("You don't have any applicable body parts.")
      this.game.controls.setOptions(
        new TextOption(`…`, () => this.game.setScene("expedition")),
      )
    }
  }

  onEnterApply(transition, card) {
    const previousName = card.title
    card.level += 1
    this.game.logger.type(`Your ${previousName} has grown into ${card.title}`)
    this.game.controls.setOptions(
      new TextOption(`…`, () => this.game.setScene("expedition")),
    )

    set(
      "player.deck",
      this.deck.cards.map(card => card.fingerprint),
    )
  }
}

StateMachine.factory(Grow, {
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
