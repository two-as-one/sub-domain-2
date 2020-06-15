import { Entity } from "./_entity"
import { define, get } from "../state/state"
import { Deck } from "../deck/deck"
import { cardFactory } from "../cards/_factory"

define("player.damage", 0)
define("player.maxHealth", 20)
define("player.gender", "male")
define("player.class", "fighter")

export class Player extends Entity {
  constructor(...args) {
    super(...args)

    this.maxHealth = get("player.maxHealth")
    this.__damage = get("player.damage")
  }

  get name() {
    return "Player"
  }

  createNewDeck() {
    const cards = []

    switch (get("player.gender")) {
      case "man":
        cards.push(
          { title: "Anus" },
          { title: "Cock" },
          { title: "Nut" },
          { title: "Nut" },
        )
        break
      case "woman":
        cards.push(
          { title: "Anus" },
          { title: "Pussy" },
          { title: "Boob" },
          { title: "Boob" },
        )
        break
      case "transman":
        cards.push({ title: "Anus" }, { title: "Pussy" })
        break
      case "transwoman":
        cards.push(
          { title: "Anus" },
          { title: "Cock" },
          { title: "Nut" },
          { title: "Nut" },
          { title: "Boob" },
          { title: "Boob" },
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

    return new Deck(
      this.game,
      ...cards.map(card => cardFactory(this.game, card)),
    )
  }
}
