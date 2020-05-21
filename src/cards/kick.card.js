import { Card } from "./_card"

export class Kick extends Card {
  constructor(game) {
    super(game, {
      title: "Kick",
      top: {
        damage: 3,
      },
      bottom: {
        combat: true,
      },
    })
  }
}
