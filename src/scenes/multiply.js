import { Scene } from "./_scene"
import StateMachine from "javascript-state-machine"
import { TextOption, CardOption } from "../controls/controls"
import { set } from "../state/state"
import { cardFactory } from "../cards/_factory"

export class Multiply extends Scene {
  constructor(game) {
    super(game)
    this._fsm()
  }

  onEnterIntro() {
    this.game.logger.type("You find a vial of multiply serum.")
    this.game.controls.setOptions(
      new TextOption(`Use it.`, () => this.use()),
      new TextOption(`Ignore it.`, () => this.game.setScene("expedition")),
    )

    this.deck = this.game.player.createDeck()
    this.viableCards = this.deck.cards.filter(card => card.type === "body")
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
    this.deck.cards.push(cardFactory(this.game, card.fingerprint))
    this.game.logger.type(`You have grown and extra ${card.title}!`)
    this.game.controls.setOptions(
      new TextOption(`…`, () => this.game.setScene("expedition")),
    )

    set(
      "player.deck",
      this.deck.cards.map(card => card.fingerprint),
    )
  }
}

StateMachine.factory(Multiply, {
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
