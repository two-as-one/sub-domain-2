import { Entity } from "./_entity"

/**
 * Base class for AI-driven combat opponents
 */
export class EntityAI extends Entity {
  constructor(game) {
    super(game)

    this.actions = []
  }

  get intentions() {
    return []
  }

  get intention() {
    return this.actions[this.actions.length - 1]
  }

  chooseIntention() {
    const action = this.game.chance.pickone(
      this.intentions.filter((intention) => intention.applies())
    )

    if (!action) {
      throw Error(`${this.name} has no applicable actions to perform`)
    }

    this.actions.push(action)
  }
}

export class Intention {
  constructor(config) {
    this.effects = config.effects
    this.applies = config.applies
  }

  get description() {
    return this.effects.map((effect) => effect.description).join(" ")
  }

  apply(target) {
    return this.effects.forEach((effect) => effect.apply(target))
  }
}
