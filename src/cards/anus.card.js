import { Card } from "./_card"

export class Anus extends Card {
  constructor(game) {
    super(game, {
      title: "Anus",
      top: {
        damage: 3,
      },
      bottom: {
        block: 6,
      },
    })
  }
}
