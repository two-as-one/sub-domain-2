import Chance from "chance"
const chance = new Chance()

class Card {
  constructor() {}

  get text() {
    return this.__text
  }

  /** plays this card, to be implemented by individual cards */
  resolve() {}
}

class CardSword extends Card {
  get name() {
    return "Sword"
  }
}
class CardShield extends Card {
  get name() {
    return "Shield"
  }
}
class CardPenis extends Card {
  get name() {
    return "Penis"
  }
}
class CardAnal extends Card {
  get name() {
    return "Anal"
  }
}
// class CardVaginal extends Card {}
// class CardBoobies extends Card {}

class Player {
  constructor() {
    this.deck = new Deck(
      new CardSword(),
      new CardSword(),
      new CardSword(),
      new CardShield(),
      new CardShield(),
      new CardShield(),
      new CardAnal(),
      new CardPenis(),
      new CardPenis(),
    )
    this.dominance = 2
    this.strength = 1
    this.dexterity = 1
    this.submission = 1
    this.hp = 50
  }
}

class Goblin {
  constructor() {
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

    console.log(this.name, "intends to", intention.description)
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
      text += `blocking for ${this.block}`
    }
    if (this.fuck > 0) {
      text += `give ${this.fuck} fucks`
    }

    return text || "do nothing"
  }
}

class Deck {
  constructor(...cards) {
    this.__deck = []
    this.__hand = []
    this.__discard = cards
  }

  drawNewHand() {
    console.log("drawing hand")
    for (let i = 0; i < 5; i++) {
      this.drawFromDeck()
    }
  }

  discardHand() {
    this.__discard.push(...this.__hand)
    this.__hand.length = 0
    console.log("hand discarded")
  }

  drawFromDeck() {
    if (this.__deck.length === 0) {
      this.shuffleDiscardIntoDeck()
    }

    const card = this.__deck.shift()
    this.__hand.push(card)
    console.log(`drew ${card.name}`)
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

class Stack {
  constructor() {
    this.intention = null
    this.firstCard = null
    this.secondCard = null
  }

  resolve(game) {
    this.firstCard.resolve(game)
    this.secondCard.resolve(game)
    this.intention.resolve(game)

    this.intention = null
    this.firstCard = null
    this.secondCard = null
  }
}

export class Game {
  constructor() {
    this.player = new Player()
    this.opponent = new Goblin()
    this.stack = new Stack()

    this.startTurn()
  }

  startTurn() {
    this.player.deck.drawNewHand()
    this.stack.intention = this.opponent.getIntention()
  }

  endTurn() {
    this.player.deck.discardHand()
  }
}
