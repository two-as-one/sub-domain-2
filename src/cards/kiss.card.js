import { Card } from "./_card"

export class Kiss extends Card {
  static get defaults() {
    return {
      title: "Kiss",
      love: 2,
      type: "skill",
    }
  }
}
