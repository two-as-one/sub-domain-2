import { Card } from "./_card"

export class Block extends Card {
  static get defaults() {
    return {
      title: "Block",
      painBlock: 2,
      type: "skill",
    }
  }
}
