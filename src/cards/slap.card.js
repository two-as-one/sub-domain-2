import { Card } from "./_card"

export class Slap extends Card {
  static get defaults() {
    return {
      title: "Slap",
      pain: 5,
      type: "skill",
    }
  }
}
