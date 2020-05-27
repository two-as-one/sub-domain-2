import { Card } from "./_card"

export class Slap extends Card {
  constructor(game) {
    super(game, {
      title: "Slap",
      top: {
        damage: 6,
      },
      bottom: {
        damage: 3,
      },
    })
  }
}