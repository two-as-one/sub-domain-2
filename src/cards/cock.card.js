import { Card } from "./_card"

export class Cock extends Card {
  constructor(game) {
    super(game, {
      title: "Cock",
      keywords: ["penis"],
      love: 2,
      type: "body",
    })
  }
}
