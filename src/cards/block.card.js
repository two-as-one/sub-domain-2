import { Card } from "./_card"

export class Block extends Card {
  static get defaults() {
    return {
      title: "Block",
      block: 4,
      type: "skill",
    }
  }
}
