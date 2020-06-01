import { Card } from "./_card"

export class Relax extends Card {
  static get defaults() {
    return {
      title: "Relax",
      heal: 2,
      type: "skill",
    }
  }
}
