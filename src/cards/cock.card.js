import { Card } from "./_card"

export class Cock extends Card {
  static get defaults() {
    return {
      title: "Cock",
      love: 2,
      type: "body",
    }
  }
}
