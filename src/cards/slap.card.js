import { Card } from "./_card"

export class Slap extends Card {
  static get defaults() {
    return {
      title: "Slap",
      pain: 2,
      type: "skill",
    }
  }
}
