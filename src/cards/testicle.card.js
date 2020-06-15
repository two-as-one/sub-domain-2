import { Card } from "./_card"

export class Testicle extends Card {
  static get defaults() {
    return {
      title: "Nut",
      love: 5,
      type: "body",
    }
  }
}
