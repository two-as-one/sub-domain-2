import { Card } from "./_card"

export class Kiss extends Card {
  static get defaults() {
    return {
      title: "Kiss",
      love: 5,
      type: "skill",
    }
  }
}
