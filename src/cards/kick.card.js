import { Card } from "./_card"

export class Kick extends Card {
  static get defaults() {
    return {
      title: "Kick",
      pain: 2,
      conflict: true,
      type: "skill",
    }
  }
}
