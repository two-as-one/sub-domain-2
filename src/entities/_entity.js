export class Entity {
  constructor(/** @type import("./../game/game").Game*/ game) {
    this.game = game

    this.__damage = 0
    this.__pain = 0
    this.__love = 0
    this.__painBlock = 0
    this.__loveBlock = 0
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
      this.__painBlock += val
    } else {
      this.__loveBlock += val
    }
  }

  damage(val = 0, type = "pain") {
    val = Number(val) || 0

    if (val < 0) {
      val = 0
    }

    if (type === "pain") {
      this.__painBlock -= val
      if (this.__painBlock < 0) {
        this.health += this.__painBlock
        this.__pain -= this.__painBlock
        this.__painBlock = 0
      }
    } else {
      this.__loveBlock -= val
      if (this.__loveBlock < 0) {
        this.health += this.__loveBlock
        this.__love -= this.__loveBlock
        this.__loveBlock = 0
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
    this.__painBlock = 0
    this.__loveBlock = 0
    this.spunk = 0
  }
}
