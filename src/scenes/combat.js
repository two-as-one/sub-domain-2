import { Scene } from "./scene"
import StateMachine from "javascript-state-machine"

const CARDS = [
  "card 1",
  "card 2",
  "card 3",
  "card 4",
  "card 5",
  "card 6",
  "card 7",
  "card 8",
  "card 9",
  "card 10",
]

export class Combat extends Scene {
  constructor(game) {
    super(game)
    this._fsm()
  }

  onEnterIntro() {
    this.game.logger.type("combat start")
    this.game.controls.addOption(`let's go`, () => this.doUpkeep())
  }

  onEnterUpkeep() {
    this.game.logger.type("upkeep")
    this.game.controls.clearOptions()

    this.__cardsPlayed = 0
    this.__cards = this.game.chance.pick(CARDS, 4)

    setTimeout(() => this.awaitCard(), 1000)
  }

  onEnterAwaitCard() {
    this.game.logger.type("choose a card")
    this.game.controls.clearOptions()
    this.__cards.forEach(card =>
      this.game.controls.addOption(card, () => this.playCard(card)),
    )
  }

  onEnterPlayCard(transition, name) {
    this.game.logger.type(`playing ${name}`)
    this.game.controls.clearOptions()
    this.__cardsPlayed += 1
    this.__cards.splice(this.__cards.indexOf(name), 1)

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
