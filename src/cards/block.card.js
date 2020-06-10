import { Card } from "./_card"

export class Block extends Card {
  static get defaults() {
    return {
      title: "Block",
      block: 2,
      type: "skill",
    }
  }
}
