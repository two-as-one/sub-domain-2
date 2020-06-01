import { EntityAI } from "./_entity.ai"
import { PainEffect } from "../combat-effects/pain.effect"
import { LoveEffect } from "../combat-effects/love.effect"

export class Raider extends EntityAI {
  get name() {
    return "Raider"
  }

  get intentions() {
    return [
      {
        effect: new PainEffect(this.game, this, { value: 1 }),
        applies: () => {
          return this.love <= this.pain
        },
      },
      {
        effect: new LoveEffect(this.game, this, { value: 1 }),
        applies: () => {
          return this.love > this.pain
        },
      },
    ]
  }
}
