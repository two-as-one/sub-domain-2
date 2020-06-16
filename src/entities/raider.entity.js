import { EntityAI, Intention } from "./_entity.ai"
import { PainEffect } from "../combat-effects/pain.effect"
import { LoveEffect } from "../combat-effects/love.effect"
import { FightEffect } from "../combat-effects/fight.effect"
import { ForeplayEffect } from "../combat-effects/foreplay.effect"

export class Raider extends EntityAI {
  constructor(...args) {
    super(...args)

    this.maxHealth = 30
  }
  get name() {
    return "Raider"
  }

  get intentions() {
    return [
      new Intention({
        effects: [new PainEffect(this.game, this, { value: 3 })],
        applies: () => {
          return true
        },
      }),
      new Intention({
        effects: [new LoveEffect(this.game, this, { value: 3 })],
        applies: () => {
          return true
        },
      }),
      new Intention({
        effects: [new PainEffect(this.game, this, { value: 3 })],
        applies: () => {
          return this.love < this.pain
        },
      }),
      new Intention({
        effects: [new LoveEffect(this.game, this, { value: 3 })],
        applies: () => {
          return this.love > this.pain
        },
      }),
      new Intention({
        effects: [new FightEffect(this.game, this, {})],
        applies: () => {
          return (
            this.pain > this.maxHealth / 2 &&
            this.game.scene.stance === "foreplay"
          )
        },
      }),
      new Intention({
        effects: [new ForeplayEffect(this.game, this, {})],
        applies: () => {
          return (
            this.love > this.maxHealth / 2 && this.game.scene.stance === "fight"
          )
        },
      }),
      new Intention({
        effects: [
          new LoveEffect(this.game, this, { value: 3 }),
          new ForeplayEffect(this.game, this, {}),
        ],
        applies: () => {
          return (
            this.pain < this.maxHealth / 3 && this.game.scene.stance === "fight"
          )
        },
      }),
      new Intention({
        effects: [
          new PainEffect(this.game, this, { value: 3 }),
          new FightEffect(this.game, this, {}),
        ],
        applies: () => {
          return (
            this.love <= this.maxHealth / 3 &&
            this.game.scene.stance === "foreplay"
          )
        },
      }),
    ]
  }
}
