import { Card } from "./_card"

export class Penis extends Card {
  static get defaults() {
    return {
      title: "Cock",
      love: [2, 3, 4, 5],
      type: "body",
      levels: ["cute", "", "large", "huge"],
    }
  }
}
