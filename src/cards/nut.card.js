import { Card } from "./_card"

export class Nut extends Card {
  static get defaults() {
    return {
      title: "Nut",
      spunk: 2,
      type: "body",
    }
  }
}
