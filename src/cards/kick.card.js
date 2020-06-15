import { Card } from "./_card"

export class Kick extends Card {
  static get defaults() {
    return {
      title: "Kick",
      pain: 2,
      fight: true,
      type: "skill",
    }
  }
}
