import { Entity } from "./_entity"
import { define, set } from "../state/state"

define("player.cards", [])

export class Player extends Entity {
  get name() {
    return "Player"
  }

  static newPlayerDeck(playerClass, playerGender) {
    const cards = []

    switch (playerClass) {
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

    switch (playerGender) {
      case "male":
        cards.push(
          { title: "Anus" },
          { title: "Cock" },
          { title: "Nut" },
          { title: "Nut" },
        )
        break
      case "female":
        cards.push(
          { title: "Anus" },
          { title: "Pussy" },
          { title: "Boob" },
          { title: "Boob" },
        )
        break
    }

    set("player.cards", cards)
  }
}
