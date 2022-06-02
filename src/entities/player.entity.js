import { Entity } from "./_entity"
import { define, get } from "../state/state"
import { Deck } from "../deck/deck"
import { cardFactory } from "../cards/factory"
import CONFIG from "../config.yaml"

define("player.damage", 0)
define("player.maxHealth", 60)
define("player.gender", "man")
define("player.class", "fighter")
define("player.deck", [])

export class Player extends Entity {
  constructor(...args) {
    super(...args)

    this.maxHealth = get("player.maxHealth")
    this.__damage = get("player.damage")
  }

  get name() {
    return "Player"
  }

  static get starterDeck() {
    return [
      ...CONFIG.decks[get("player.gender")],
      ...CONFIG.decks[get("player.class")],
    ]
  }

  createDeck() {
    return new Deck(
      this.game,
      ...get("player.deck").map((card) => cardFactory(this.game, card))
    )
  }
}
