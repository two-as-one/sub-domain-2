import { PainEffect } from "../combat-effects/pain.effect"
import { LoveEffect } from "../combat-effects/love.effect"
import { AnticipationEffect } from "../combat-effects/anticipation.effect"
import { BlockEffect } from "../combat-effects/block.effect"
import { ConflictEffect } from "../combat-effects/conflict.effect"
import { ForeplayEffect } from "../combat-effects/foreplay.effect"

let id = 0
export class Card {
  constructor(game, config) {
    this.game = game
    this.config = config

    this.effects = []

    this.id = id
    id += 1

    if (this.pain) {
      this.effects.push(new PainEffect(game, game.player, { value: this.pain }))
    }

    if (this.love) {
      this.effects.push(new LoveEffect(game, game.player, { value: this.love }))
    }

    if (this.anticipation) {
      this.effects.push(
        new AnticipationEffect(game, game.player, {
          value: this.anticipation,
        })
      )
    }

    if (this.block) {
      this.effects.push(
        new BlockEffect(game, game.player, {
          value: this.block,
        })
      )
    }

    if (this.conflict) {
      this.effects.push(new ConflictEffect(game, game.player, {}))
    }

    if (this.foreplay) {
      this.effects.push(new ForeplayEffect(game, game.player, {}))
    }
  }

  get level() {
    return Math.min(Math.max(0, this.config.level || 0), this.levels.length)
  }

  set level(val) {
    this.config.level = val
  }

  get levels() {
    return this.config.levels || []
  }

  get title() {
    return [
      Card.levelAdjust(this.levels, this.level),
      Card.levelAdjust(this.config.title || "[NO_NAME]", this.level),
    ]
      .filter((val) => !!val)
      .join(" ")
  }

  get name() {
    return this.title
  }

  get pain() {
    return Card.levelAdjust(this.config.pain || 0, this.level)
  }

  get love() {
    return Card.levelAdjust(this.config.love || 0, this.level)
  }

  get block() {
    return Card.levelAdjust(this.config.block || 0, this.level)
  }

  get anticipation() {
    return Card.levelAdjust(this.config.anticipation || 0, this.level)
  }

  get conflict() {
    return Boolean(this.config.conflict)
  }

  get foreplay() {
    return Boolean(this.config.foreplay)
  }

  get type() {
    return this.config.type || "body"
  }

  get descriptions() {
    return this.effects.map((effect) => effect.description)
  }

  get tooltips() {
    return [
      ...new Set(this.effects.map((effect) => effect.tooltips).flat()),
    ].filter((item) => !!item)
  }

  play(target) {
    this.effects.forEach((effect) => effect.apply(target))
  }

  static levelAdjust(value, level = 0) {
    if (Array.isArray(value)) {
      return value[level]
    } else {
      return value
    }
  }

  get fingerprint() {
    return {
      title: this.config.title,
      level: this.config.level || 0,
    }
  }
}
