import { Card } from "./_card"

export class Slap extends Card {
  constructor(game) {
    super(game, {
      title: "Slap",
      pain: 2,
      type: "skill",
    })
  }
}
