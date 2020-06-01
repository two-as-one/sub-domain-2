import { EntityAI } from "./_entity.ai"
import { PainEffect } from "../combat-effects/pain.effect"
import { LoveEffect } from "../combat-effects/love.effect"
import { FightEffect } from "../combat-effects/fight.effect"
import { ForeplayEffect } from "../combat-effects/foreplay.effect"

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
      {
        effect: new FightEffect(this.game, this, {}),
        applies: () => {
          return this.pain > this.love && this.game.scene.stance === "foreplay"
        },
      },
      {
        effect: new ForeplayEffect(this.game, this, {}),
        applies: () => {
          return this.love > this.pain && this.game.scene.stance === "fight"
        },
      },
    ]
  }
}
