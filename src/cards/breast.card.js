import { Card } from "./_card"

export class Breast extends Card {
  static get defaults() {
    return {
      title: "Boob",
      love: 2,
      type: "body",
    }
  }
}
