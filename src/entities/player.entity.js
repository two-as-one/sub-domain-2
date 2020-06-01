import { Entity } from "./_entity"
import { state } from "../state/state"

state.player = state.player || {}
state.player.cards = state.player.cards || []

export class Player extends Entity {
  get name() {
    return "Player"
  }

  static newPlayerDeck(playerClass, playerGender) {
    state.player.cards = []

    switch (playerClass) {
      case "fighter":
        state.player.cards.push(
          { title: "Block" },
          { title: "Block" },
          { title: "Kick" },
          { title: "Kick" },
          { title: "Slap" },
          { title: "Slap" },
        )
    }

    switch (playerGender) {
      case "male":
        state.player.cards.push(
          { title: "Anus" },
          { title: "Cock" },
          { title: "Nut" },
          { title: "Nut" },
        )
    }
  }
}
