import { Card } from "./_card"

export class Anus extends Card {
  static get defaults() {
    return {
      title: "Anus",
      anticipation: [3, 4, 5, 6],
      type: "body",
      levels: ["tight", "", "wide", "gaping"],
    }
  }
}
