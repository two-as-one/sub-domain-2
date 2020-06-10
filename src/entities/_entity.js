export class Entity {
  constructor(/** @type import("./../game/game").Game*/ game) {
    this.game = game

    this.__damage = 0
    this.__pain = 0
    this.__love = 0
    this.__block = 0
    this.__anticipation = 0
    this.maxHealth = 10
    this.spunk = 0
  }

  get name() {
    return "entity"
  }

  get health() {
    return this.maxHealth - this.__damage
  }

  get pain() {
    return this.__pain
  }

  get love() {
    return this.__love
  }

  set health(val) {
    val = Number(val) || 0

    if (val < 0) {
      val = 0
    }

    if (val > this.maxHealth) {
      val = this.maxHealth
    }

    this.__damage = this.maxHealth - val
  }

  block(val = 0, type = "pain") {
    val = Number(val) || 0

    if (val < 0) {
      val = 0
    }

    if (type === "pain") {
      this.__block += val
    } else {
      this.__anticipation += val
    }
  }

  damage(val = 0, type = "pain") {
    val = Number(val) || 0

    if (val < 0) {
      val = 0
    }

    if (type === "pain") {
      this.__block -= val
      if (this.__block < 0) {
        this.health += this.__block
        this.__pain -= this.__block
        this.__block = 0
      }
    } else {
      this.__anticipation -= val
      if (this.__anticipation < 0) {
        this.health += this.__anticipation
        this.__love -= this.__anticipation
        this.__anticipation = 0
      }
    }
  }

  heal(val = 0) {
    val = Number(val) || 0

    if (val < 0) {
      val = 0
    }

    this.health += val
  }

  /**
   * Clean up needed after each combat
   * Remove buffs, temporary status effects, etc
   */
  postCombat() {
    this.__pain = 0
    this.__love = 0
    this.__block = 0
    this.__anticipation = 0
    this.spunk = 0
  }
}
