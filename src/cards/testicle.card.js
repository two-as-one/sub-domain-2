import { Card } from "./_card"

export class Testicle extends Card {
  static get defaults() {
    return {
      title: "Nut",
      love: 3,
      type: "body",
    }
  }
}
