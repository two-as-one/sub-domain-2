import { Card } from "./_card"

export class Whip extends Card {
  static get defaults() {
    return {
      title: "Whip",
      anticipation: 2,
      pain: 2,
      type: "gear",
    }
  }
}
