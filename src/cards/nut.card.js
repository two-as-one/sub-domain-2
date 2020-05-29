import { Card } from "./_card"

export class Nut extends Card {
  constructor(game) {
    super(game, {
      title: "Nut",
      nut: 2,
      type: "body",
    })
  }
}
