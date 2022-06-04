import { Scene } from "./_Scene"
import StateMachine from "javascript-state-machine"
import { EntityFactory } from "../../entities/_factory"

export class CombatScene extends Scene {
  get stance() {
    return this.__stance
  }

  set stance(val) {
    if (val === "conflict" && this.stance === "foreplay") {
      this.__stance = "conflict"
    }

    if (val === "foreplay" && this.stance === "conflict") {
      this.__stance = "foreplay"
    }
  }

  onCardUsed(e) {
    this.playCard(e.detail)
  }

  onEnterIntro() {
    this.player = this.game.player
    this.enemy = EntityFactory(
      this.game,
      this.game.chance.pickone(["raider", "slime"])
    )

    this.__stance = "conflict"
    this.__actionPoints = 2

    this.deck = this.player.createDeck()

    this.chat.type(`You've stumbled across a ${this.enemy.name}`)
    this.options = []

    setTimeout(
      () =>
        (this.options = [{ text: `It's go time`, fn: () => this.doUpkeep() }]),
      1000
    )
  }

  onEnterUpkeep() {
    this.enemy.chooseIntention()
    this.chat.type(
      `${this.enemy.name} intention: ${this.enemy.intention.description}`
    )
    this.options = []

    this.__actionPoints = 2
    this.player.__block = 0
    this.player.__anticipation = 0

    this.deck.hand.forEach((card) => this.deck.discard(card))

    this.deck.draw()
    this.deck.draw()
    this.deck.draw()
    this.deck.draw()

    setTimeout(() => this.awaitCard(), 1000)
  }

  onEnterAwaitCard() {
    this.chat.type("choose a card")
    this.options = []
    this.hand.cards = [...this.deck.hand]
    this.hand.show()
  }

  onEnterPlayCard(transition, card) {
    this.chat.type(`playing ${card.title}`, { source: "player" })
    this.options = []
    this.__actionPoints -= 1

    this.deck.discard(card)
    card.play(this.enemy)

    if (this.player.health <= 0 || this.enemy.health <= 0) {
      setTimeout(() => this.end(), 1000)
    } else if (this.__actionPoints > 0) {
      this.hand.cards = [...this.deck.hand]
      this.hand.show()
      setTimeout(() => this.awaitCard(), 0)
    } else {
      this.hand.hide()
      setTimeout(() => this.doEnemy(), 1000)
    }
  }

  onEnterEnemyTurn() {
    this.chat.type(`enemy turn`)
    this.options = []
    this.hand.hide()

    this.enemy.__block = 0
    this.enemy.__anticipation = 0

    this.enemy.intention.apply(this.player)

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
    this.chat.type(`You won!`)
    this.options = [
      { text: `Yay!`, fn: () => this.game.setScene("expedition") },
    ]
  }

  onEnterDefeat() {
    this.chat.type(`You lost!`)
    this.options = [
      { text: `Awww…`, fn: () => this.game.setScene("expedition") },
    ]
  }

  unload() {
    this.player.postCombat()
  }
}

StateMachine.factory(CombatScene, {
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
