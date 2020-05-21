import { Card } from "./_card"

export class Relax extends Card {
  constructor(game) {
    super(game, {
      title: "Relax",
      heal: 3,
    })
  }
}
