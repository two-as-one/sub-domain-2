import { Card } from "./_card"

export class CardSlap extends Card {
  get title() {
    return "Slap"
  }

  get text() {
    return `
      combat: deal [6] damage
      foreplay: deal [3] damage
    `
  }

  get keywords() {
    return []
  }

  combat(scene) {
    scene.enemy.damage(6)
  }

  foreplay(scene) {
    scene.enemy.damage(3)
  }
}
