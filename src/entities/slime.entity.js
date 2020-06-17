import { EntityAI, Intention } from "./_entity.ai"
import { PainEffect } from "../combat-effects/pain.effect"
import { LoveEffect } from "../combat-effects/love.effect"
import { ForeplayEffect } from "../combat-effects/foreplay.effect"

export class Slime extends EntityAI {
  constructor(...args) {
    super(...args)

    this.maxHealth = 20
  }

  get name() {
    return "Slime"
  }

  get intentions() {
    return [
      new Intention({
        effects: [
          new PainEffect(this.game, this, { value: 1 }),
          new LoveEffect(this.game, this, { value: 1 }),
          new ForeplayEffect(this.game, this, {}),
        ],
        applies: () => true,
      }),
    ]
  }
}
