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
      this.game.dispatchEvent(new CustomEvent("cardStateChanged"))
    }

    if (val === "foreplay" && this.stance === "conflict") {
      this.__stance = "foreplay"
      this.game.dispatchEvent(new CustomEvent("cardStateChanged"))
    }
  }

  onCardUsed(e) {
    this.playCard(e.detail)
  }

  onEnterIntro() {
    this.enemy = EntityFactory(
      this.game,
      this.game.chance.pickone(["raider", "slime"])
    )

    this.__stance = "conflict"

    this.chat.type(`You've stumbled across a ${this.enemy.name}`)
    this.options = []

    setTimeout(
      () =>
        (this.options = [{ text: `It's go time`, fn: () => this.doUpkeep() }]),
      1000
    )
  }

  async onEnterUpkeep() {
    this.enemy.chooseIntention()
    this.chat.type(
      `${this.enemy.name} intention: ${this.enemy.intention.description}`
    )
    this.options = []
    this.deck.showHand = true

    this.__actionPoints = 2
    this.player.__block = 0
    this.player.__anticipation = 0

    await new Promise((r) => setTimeout(r, 250))
    await this.deck.draw()
    await new Promise((r) => setTimeout(r, 250))
    await this.deck.draw()
    await new Promise((r) => setTimeout(r, 250))
    await this.deck.draw()
    await new Promise((r) => setTimeout(r, 250))
    await this.deck.draw()

    setTimeout(() => this.awaitCard(), 0)
  }

  onEnterAwaitCard() {
    this.chat.type("choose a card")
    this.options = []
  }

  async onEnterPlayCard(transition, card) {
    this.chat.type(`playing ${card.title}`, { source: "player" })
    this.options = []
    this.__actionPoints -= 1

    this.deck.play(card)
    card.play(this.enemy)

    if (this.player.health <= 0 || this.enemy.health <= 0) {
      setTimeout(() => this.end(), 1000)
    } else if (this.__actionPoints > 0) {
      setTimeout(() => this.awaitCard(), 0)
    } else {
      await new Promise((r) => setTimeout(r, 1500))

      while (this.deck.__hand.length > 0) {
        this.deck.discard()
        await new Promise((r) => setTimeout(r, 250))
      }

      setTimeout(() => this.doEnemy(), 0)
    }
  }

  onEnterEnemyTurn() {
    this.chat.type(`enemy turn`)
    this.options = []

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
