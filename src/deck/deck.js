export class Deck {
  constructor(game, ...cards) {
    this.game = game

    this.__cards = [...cards]
    this.__library = [...cards]
    this.__hand = []
    this.__discard = []

    this.shuffle()
  }

  get hand() {
    return this.__hand.slice()
  }

  get cards() {
    return this.__cards.sort((a, b) => {
      if (a.title < b.title) {
        return -1
      }
      if (a.title > b.title) {
        return 1
      }
      return 0
    })
  }

  /** draw a random card from the deck */
  draw() {
    if (this.__library.length < 1) {
      this.shuffle()
    }

    if (this.__library.length < 1) {
      return
    }

    const card = this.game.chance.pickone(this.__library)

    if (card) {
      this.__library.splice(this.__library.indexOf(card), 1)
      this.__hand.push(card)
    }

    return card
  }

  /** discard a card from hand */
  discard(card) {
    if (this.__hand.includes(card)) {
      this.__hand.splice(this.__hand.indexOf(card), 1)
      this.__discard.push(card)
    }
  }

  /** shuffle the discard back into the deck */
  shuffle() {
    this.__library.push(...this.__discard)
    this.__discard.length = 0
    this.__library = this.game.chance.shuffle(this.__library)
  }
}
