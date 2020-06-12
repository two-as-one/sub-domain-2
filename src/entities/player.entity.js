import { Entity } from "./_entity"
import { define, get } from "../state/state"

define("player.cards", [])
define("player.damage", 0)
define("player.maxHealth", 20)

export class Player extends Entity {
  constructor(...args) {
    super(...args)

    this.maxHealth = get("player.maxHealth")
    this.__damage = get("player.damage")
  }

  get name() {
    return "Player"
  }
}
