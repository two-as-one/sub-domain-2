import { html, render } from "lit-html"
import { evaluate } from "mathjs"
import Chance from "chance"
const chance = new Chance()

import config from "../config.yaml"
import { Logger } from "../logger/logger"

const logger = new Logger()

class Card {
  constructor(game, name) {
    this.game = game
    this.__importConfig(name)
  }

  __importConfig(name) {
    if (!config.cards[name]) {
      throw Error(`No config found for card named ${name}`)
    }

    this.config = config.cards[name]
  }

  get name() {
    return this.config.name
  }

  __calc(formula) {
    return evaluate(formula, {
      str: this.game.player.strength,
      dex: this.game.player.dexterity,
      dom: this.game.player.dominance,
      sub: this.game.player.submission,
    })
  }

  __fatigue(amount) {
    this.game.opponent.fatigue(this.__calc(amount))
  }

  __endure(amount) {
    this.game.player.endure(this.__calc(amount))
  }

  __soothe(amount) {
    this.game.player.soothe(this.__calc(amount))
  }

  __resolve(config) {
    if (!config) {
      return
    }

    if (config.fatigue) {
      this.__fatigue(config.fatigue)
    }

    if (config.endure) {
      this.__endure(config.endure)
    }

    if (config.soothe) {
      this.__soothe(config.soothe)
    }
  }

  play() {
    this.__resolve(this.config.played)

    if (this.config.climax && this.game.opponent.hp === 0) {
      this.__resolve(this.config.climax)
    }
  }
}

class Entity {
  constructor(game) {
    this.game = game
    this.__hp = 10
    this.__fatigue = 0
    this.__endure = 0
  }

  upkeep() {
    this.__endure = 0
  }

  soothe(amount = 0) {
    this.__fatigue -= amount

    if (this.__fatigue < 0) {
      this.__fatigue = 0
    }

    console.log(`soothed ${this.name} for ${amount}`)
  }

  fatigue(amount = 0) {
    console.log(`fatigued ${this.name} for ${amount}`)
    amount = this.__endure - amount

    if (amount > 0) {
      this.__endure = amount
    } else {
      this.__endure = 0
      this.__fatigue -= amount
    }
  }

  endure(amount = 0) {
    this.__endure += amount

    console.log(`${this.name} endures for ${amount}`)
  }

  get hp() {
    return Math.max(0, this.__hp - this.__fatigue)
  }

  set hp(val) {
    this.__hp = val
  }
}

class Player extends Entity {
  constructor(game) {
    super(game)

    this.deck = new Deck(
      game,
      new Card(game, "sword"),
      new Card(game, "sword"),
      new Card(game, "sword"),
      new Card(game, "shield"),
      new Card(game, "shield"),
      new Card(game, "shield"),
      new Card(game, "anal"),
      new Card(game, "penis"),
      new Card(game, "penis"),
    )
    this.dominance = 2
    this.strength = 1
    this.dexterity = 1
    this.submission = 1
    this.hp = 50
  }

  get name() {
    return "player"
  }
}

class Goblin extends Entity {
  constructor(game) {
    super(game)
    this.hp = 10
  }

  get name() {
    return "goblin"
  }

  getIntention() {
    const intention = new Intention()

    switch (chance.integer({ min: 0, max: 2 })) {
      case 0:
        intention.damage = 5
        break
      case 1:
        intention.block = 5
        break
      case 2:
        intention.fuck = 5
        break
    }

    return intention
  }
}

class Intention {
  constructor() {
    this.damage = 0
    this.fuck = 0
    this.block = 0
  }

  get description() {
    let text = ""

    if (this.damage > 0) {
      text += `inflict ${this.damage} damage`
    }
    if (this.block > 0) {
      text += `block for ${this.block}`
    }
    if (this.fuck > 0) {
      text += `give ${this.fuck} fucks`
    }

    return text || "do nothing"
  }

  resolve(game) {
    if (this.damage > 0) {
      game.player.fatigue(this.damage)
    }
    if (this.block > 0) {
      game.opponent.endure(this.block)
    }
    if (this.fuck > 0) {
      game.player.fatigue(this.fuck)
    }
  }
}

class Deck {
  constructor(game, ...cards) {
    this.game = game
    this.__deck = []
    this.__hand = []
    this.__discard = cards
  }

  get hand() {
    return this.__hand.slice()
  }

  playCard(card) {
    if (!this.__hand.includes(card)) {
      throw Error("Cannot play a card that is not in your hand.")
    }

    this.__hand.splice(this.__hand.indexOf(card), 1)
    card.play()
    this.__discard.push(card)
  }

  discardHand() {
    this.__discard.push(...this.__hand)
    this.__hand.length = 0
    logger.clearOptions()
  }

  drawFromDeck() {
    if (this.__deck.length === 0) {
      this.shuffleDiscardIntoDeck()
    }

    const card = this.__deck.shift()
    this.__hand.push(card)
    console.log(`drew ${card.name}`)
    logger.addOption(card.name, () => this.game.play(card))
  }

  shuffleDiscardIntoDeck() {
    console.log("shuffling discard into deck")

    while (this.__discard.length) {
      const index = Math.floor(Math.random() * this.__discard.length)
      const card = this.__discard.splice(index, 1)[0]
      this.__deck.push(card)
    }
  }
}

class Turn {
  constructor(game) {
    this.game = game
  }

  play(card) {
    if (this.__current === 1) {
      this.playCard1(card)
    } else {
      this.playCard2(card)
    }
  }

  _playCard(card) {
    console.log("playing", card.name)
    this.game.player.deck.playCard(card)
  }

  start() {
    this.upkeep()
  }
  upkeep() {
    console.log("upkeep")
    this.game.player.upkeep()
    // TODO: any upkeep

    this.drawHand()
  }
  drawHand() {
    console.log("drawing hand")
    for (let i = 0; i < 4; i++) {
      this.game.player.deck.drawFromDeck()
    }

    this.determineEnemyIntention()
  }
  determineEnemyIntention() {
    console.log("determining intention")
    this.intention = this.game.opponent.getIntention()
    logger.type(
      `${this.game.opponent.name} intends to ${this.intention.description}`,
    )

    this.waitForCard1()
  }
  waitForCard1() {
    this.__current = 1
    this.game.render()
    console.log("waiting for card 1 ...")
  }
  playCard1(card) {
    this._playCard(card)
    this.waitForCard2()
  }
  waitForCard2() {
    this.__current = 2
    this.game.render()
    console.log("waiting for card 2 ...")
  }
  playCard2(card) {
    this._playCard(card)
    this.resolveEnemyIntention()
  }
  resolveEnemyIntention() {
    console.log("resolving enemy intention")
    this.game.opponent.upkeep()
    this.intention.resolve(this.game)
    this.discardHand()
  }
  discardHand() {
    console.log("discarding hand")
    this.game.player.deck.discardHand()
    this.end()
  }
  end() {
    console.log("turn ended")
    this.game.nextTurn()
    // TODO: determine next turn or end of combat
  }
}

export class Game {
  constructor() {
    this.player = new Player(this)
    this.opponent = new Goblin(this)
    this.el = document.createElement("div")
    document.body.appendChild(this.el)
    document.body.appendChild(logger.el)
    this.nextTurn()
  }

  nextTurn() {
    if (this.opponent.hp > 0) {
      this.turn = new Turn(this)
      this.turn.start()
    }
  }

  play(card) {
    this.turn.play(card)
  }

  render() {
    render(turnTemplate(this), this.el)
  }
}

const turnTemplate = game => html`
  <section class="turn">
    ${entityTemplate(game.player)} ${entityTemplate(game.opponent)}
  </section>
`

const entityTemplate = entity => html`
  <section class="entity">
    <h1>${entity.name}</h1>
    <ul>
      <li>resolve: ${entity.hp} / ${entity.__hp}</li>
      <li>enduring: ${entity.__endure}</li>
    </ul>
  </section>
`
