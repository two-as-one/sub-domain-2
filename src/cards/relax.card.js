import { Card } from "./_card"

export class Relax extends Card {
  static get defaults() {
    return {
      title: "Relax",
      heal: 5,
      type: "skill",
    }
  }
}
