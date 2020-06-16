import { Card } from "./_card"

export class Testicles extends Card {
  static get defaults() {
    return {
      title: "Balls",
      love: [2, 3, 4, 5],
      type: "body",
      levels: ["cute", "", "large", "huge"],
    }
  }
}
