import { Card } from "./_card"

export class Kick extends Card {
  constructor(game) {
    super(game, {
      title: "Kick",
      pain: 1,
      combat: true,
      type: "skill",
    })
  }
}
