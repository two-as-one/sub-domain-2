import { Entity } from "./_entity"
import { define, get } from "../state/state"
import { Deck } from "../deck/deck"
import { cardFactory } from "../cards/_factory"

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
    const cards = []
    switch (get("player.gender")) {
      case "man":
        cards.push(
          { title: "Anus", level: 0 },
          { title: "Cock", level: 1 },
          { title: "Balls", level: 1 },
        )
        break
      case "woman":
        cards.push(
          { title: "Anus", level: 0 },
          { title: "Pussy", level: 1 },
          { title: "Boobs", level: 1 },
        )
        break
      case "transman":
        cards.push({ title: "Anus", level: 1 }, { title: "Pussy", level: 1 })
        break
      case "transwoman":
        cards.push(
          { title: "Anus", level: 0 },
          { title: "Cock", level: 0 },
          { title: "Balls", level: 0 },
          { title: "Boobs", level: 0 },
        )
        break
    }

    switch (get("player.class")) {
      case "fighter":
        cards.push(
          { title: "Block" },
          { title: "Block" },
          { title: "Kick" },
          { title: "Kick" },
          { title: "Slap" },
          { title: "Slap" },
        )
        break
      case "lover":
        cards.push(
          { title: "Block" },
          { title: "Block" },
          { title: "Grope" },
          { title: "Grope" },
          { title: "Kiss" },
          { title: "Kiss" },
        )
        break
    }

    return cards
  }

  createDeck() {
    return new Deck(
      this.game,
      ...get("player.deck").map(card => cardFactory(this.game, card)),
    )
  }
}
