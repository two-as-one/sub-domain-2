import { Card } from "./_card"

export class Cock extends Card {
  constructor(game) {
    super(game, {
      title: "Cock",
      top: {
        damage: 3,
      },
      bottom: {
        damage: 6,
      },
    })
  }
}
