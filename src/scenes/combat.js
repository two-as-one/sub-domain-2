import { Scene } from "./_scene"
import StateMachine from "javascript-state-machine"
import { Raider } from "../entities/raider.entity"
import { TextOption, CardOption } from "../controls/controls"
import { html } from "lit-html"

export class Combat extends Scene {
  constructor(game) {
    super(game)
    this.player = game.player
    this.enemy = new Raider(this.game)

    this.__stance = "fight"

    this.deck = this.player.createNewDeck()

    this._fsm()
  }

  get stance() {
    return this.__stance
  }

  set stance(val) {
    if (val === "fight" && this.stance === "foreplay") {
      this.__stance = "fight"
    }

    if (val === "foreplay" && this.stance === "fight") {
      this.__stance = "foreplay"
    }
  }

  onEnterIntro() {
    this.game.logger.type(`You've stumbled across a ${this.enemy.name}`)
    this.game.controls.setOptions(
      new TextOption(`It's go time`, () => this.doUpkeep()),
    )
  }

  onEnterUpkeep() {
    this.enemy.chooseIntention()
    this.game.logger.type(
      html`${this.enemy.name} intention:
      ${this.enemy.intention.effect.describe()}`,
    )
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
    this.game.controls.setOptions(
      ...this.deck.hand.map(
        card => new CardOption(card, () => this.playCard(card)),
      ),
    )
  }

  onEnterPlayCard(transition, card) {
    this.game.logger.type(`playing ${card.title}`, { source: "player" })
    this.game.controls.clearOptions()
    this.__cardsPlayed += 1

    this.deck.discard(card)
    card.play(this.enemy)

    if (this.player.health <= 0 || this.enemy.health <= 0) {
      setTimeout(() => this.end(), 1000)
    } else if (this.__cardsPlayed >= 2) {
      setTimeout(() => this.doEnemy(), 1000)
    } else {
      setTimeout(() => this.awaitCard(), 1000)
    }
  }

  onEnterEnemyTurn() {
    this.game.logger.type(`enemy turn`)
    this.game.controls.clearOptions()
    this.enemy.intention.effect.apply(this.player)

    if (this.player.health <= 0 || this.enemy.health <= 0) {
      setTimeout(() => this.end(), 1000)
    } else {
      setTimeout(() => this.doUpkeep(), 1000)
    }
  }

  onEnterEnd() {
    if (this.player.health <= 0) {
      setTimeout(() => this.lose(), 0)
    } else {
      setTimeout(() => this.win(), 0)
    }
  }

  onEnterVictory() {
    this.game.logger.type(`You won!`)
    this.game.controls.setOptions(
      new TextOption(`Yay!`, () => this.game.setScene("expedition")),
    )
  }

  onEnterDefeat() {
    this.game.logger.type(`You lost!`)
    this.game.controls.setOptions(
      new TextOption(`Awww…`, () => this.game.setScene("expedition")),
    )
  }

  unload() {
    this.player.postCombat()
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
    { name: "win", from: "end", to: "victory" },
    { name: "lose", from: "end", to: "defeat" },
  ],
})

// To visualize this state machine:
// import visualize from "javascript-state-machine/lib/visualize"
// console.log(visualize(Combat))
// then copy and paste output to https://dreampuf.github.io/GraphvizOnline
