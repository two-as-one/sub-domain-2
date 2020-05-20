export class Entity {
  constructor(game) {
    this.game = game

    this.__damage = 0
    this.maxHealth = 10
  }

  get name() {
    return "entity"
  }

  get health() {
    return this.maxHealth - this.__damage
  }

  set health(val) {
    if (val < 0) {
      val = 0
    }

    if (val > this.maxHealth) {
      val = this.maxHealth
    }

    this.__damage = this.maxHealth - val
  }

  damage(val = 0) {
    if (val < 0) {
      val = 0
    }
    this.health -= val
  }

  heal(val = 0) {
    if (val < 0) {
      val = 0
    }
    this.health += val
  }
}
