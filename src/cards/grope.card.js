import { Card } from "./_card"

export class Grope extends Card {
  constructor(game) {
    super(game, {
      title: "Grope",
      foreplay: true,
      love: 1,
      type: "skill",
    })
  }
}
