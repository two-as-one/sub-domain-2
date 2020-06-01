import { html } from "lit-html"
import "./_card.sass"
import { PainEffect } from "../combat-effects/pain.effect"
import { LoveEffect } from "../combat-effects/love.effect"
import { LoveBlockEffect } from "../combat-effects/love-block.effect"
import { PainBlockEffect } from "../combat-effects/pain-block.effect"
import { SpunkEffect } from "../combat-effects/spunk.effect"
import { FightEffect } from "../combat-effects/fight.effect"
import { ForeplayEffect } from "../combat-effects/foreplay.effect"

export class Card {
  constructor(/** @type import("./../game/game").Game*/ game, config) {
    this.game = game
    this.config = config

    this.effects = []

    if (this.config.pain) {
      this.effects.push(
        new PainEffect(game, game.player, { value: this.config.pain }),
      )
    }

    if (this.config.love) {
      this.effects.push(
        new LoveEffect(game, game.player, { value: this.config.love }),
      )
    }

    if (this.config.loveBlock) {
      this.effects.push(
        new LoveBlockEffect(game, game.player, {
          value: this.config.loveBlock,
        }),
      )
    }

    if (this.config.painBlock) {
      this.effects.push(
        new PainBlockEffect(game, game.player, {
          value: this.config.painBlock,
        }),
      )
    }

    if (this.config.fight) {
      this.effects.push(new FightEffect(game, game.player, {}))
    }

    if (this.config.foreplay) {
      this.effects.push(new ForeplayEffect(game, game.player, {}))
    }

    if (this.config.spunk) {
      this.effects.push(
        new SpunkEffect(game, game.player, {
          value: this.config.spunk,
        }),
      )
    }
  }

  get title() {
    return this.config.title || "[NO_NAME]"
  }

  get type() {
    return this.config.type || "body"
  }

  describe() {
    return this.effects.map(effect => effect.describe())
  }

  play(target) {
    this.effects.forEach(effect => effect.apply(target))
  }

  get template() {
    return html`
      <div class="card">
        <h1 class="title">${this.title}</h1>
        <h2 class="source">${this.type}</h2>
        <section class="normal">
          <section>
            <ul>
              ${this.describe().map(effect => html`<li>${effect}</li>`)}
            </ul>
          </section>
        </section>
      </div>
    `
  }
}
