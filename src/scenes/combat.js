import { Scene } from "./scene"
import StateMachine from "javascript-state-machine"
import { Raider } from "../entities/raider.entity"
import { Deck } from "../deck/deck"
import { CardSlap } from "../cards/slap.card"

export class Combat extends Scene {
  constructor(game) {
    super(game)
    this.player = game.player
    this.enemy = new Raider(this.game)

    this.stance = "combat"

    this.deck = new Deck(
      this.game,
      new CardSlap(this.game),
      new CardSlap(this.game),
      new CardSlap(this.game),
      new CardSlap(this.game),
      new CardSlap(this.game),
      new CardSlap(this.game),
      new CardSlap(this.game),
      new CardSlap(this.game),
      new CardSlap(this.game),
      new CardSlap(this.game),
    )

    this._fsm()
  }

  onEnterIntro() {
    this.game.logger.type(`You've stumbled across a ${this.enemy.name}`)
    this.game.controls.addOption(`It's go time`, () => this.doUpkeep())
  }

  onEnterUpkeep() {
    this.game.logger.type("upkeep")
    this.game.controls.clearOptions()

    this.__cardsPlayed = 0

    this.deck.hand.forEach(card => this.deck.discard(card))

    this.deck.draw()
    this.deck.draw()
    this.deck.draw()
    this.deck.draw()

    setTimeout(() => this.awaitCard(), 1000)
  }

  onEnterAwaitCard() {
    this.game.logger.type("choose a card")
    this.game.controls.clearOptions()
    this.deck.hand.forEach(card =>
      this.game.controls.addOption(card, () => this.playCard(card)),
    )
  }

  onEnterPlayCard(transition, card) {
    this.game.logger.type(`playing ${card.title}`)
    this.game.controls.clearOptions()
    this.__cardsPlayed += 1

    this.deck.discard(card)
    card.play(this)

    if (this.__cardsPlayed >= 2) {
      setTimeout(() => this.doEnemy(), 1000)
    } else {
      setTimeout(() => this.awaitCard(), 1000)
    }
  }

  onEnterEnemyTurn() {
    this.game.logger.type(`enemy turn`)
    this.game.controls.clearOptions()
    setTimeout(() => this.doUpkeep(), 1000)
  }
}

StateMachine.factory(Combat, {
  init: "intro",
  transitions: [
    { name: "start", from: "none", to: "intro" },
    { name: "doUpkeep", from: ["intro", "enemyTurn"], to: "upkeep" },
    { name: "awaitCard", from: ["upkeep", "playCard"], to: "awaitCard" },
    { name: "playCard", from: "awaitCard", to: "playCard" },
    { name: "doEnemy", from: "playCard", to: "enemyTurn" },
    { name: "end", from: ["upkeep", "playCard", "enemyTurn"], to: "end" },
    { name: "win", from: "end", to: "vicory" },
    { name: "lose", from: "end", to: "loss" },
  ],
})

// To visualize this state machine:
// import visualize from "javascript-state-machine/lib/visualize"
// console.log(visualize(Combat))
// then copy and paste output to https://dreampuf.github.io/GraphvizOnline
