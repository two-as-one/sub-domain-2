import { Card } from "./_card"

export class Grope extends Card {
  static get defaults() {
    return {
      title: "Grope",
      foreplay: true,
      love: 5,
      type: "skill",
    }
  }
}
