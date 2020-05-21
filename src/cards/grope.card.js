import { Card } from "./_card"

export class Grope extends Card {
  constructor(game) {
    super(game, {
      title: "Grope",
      top: {
        foreplay: true,
      },
      bottom: {
        damage: 3,
      },
    })
  }
}
