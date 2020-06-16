import { Card } from "./_card"

export class Breasts extends Card {
  static get defaults() {
    return {
      title: "Boobs",
      love: [2, 3, 4, 5],
      type: "body",
      levels: ["cute", "", "large", "huge"],
    }
  }
}
