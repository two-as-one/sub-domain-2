import { html } from "lit-html"
import "./_card.sass"
import { PainEffect } from "../combat-effects/pain.effect"
import { LoveEffect } from "../combat-effects/love.effect"
import { AnticipationEffect } from "../combat-effects/anticipation.effect"
import { BlockEffect } from "../combat-effects/block.effect"
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

    if (this.config.anticipation) {
      this.effects.push(
        new AnticipationEffect(game, game.player, {
          value: this.config.anticipation,
        }),
      )
    }

    if (this.config.block) {
      this.effects.push(
        new BlockEffect(game, game.player, {
          value: this.config.block,
        }),
      )
    }

    if (this.config.fight) {
      this.effects.push(new FightEffect(game, game.player, {}))
    }

    if (this.config.foreplay) {
      this.effects.push(new ForeplayEffect(game, game.player, {}))
    }
  }

  get title() {
    return this.config.title || "[NO_NAME]"
  }

  get type() {
    return this.config.type || "body"
  }

  get descriptions() {
    return this.effects.map(effect => effect.describe())
  }

  get tooltips() {
    return [
      ...new Set(this.effects.map(effect => effect.tooltips).flat()),
    ].filter(item => !!item)
  }

  play(target) {
    this.effects.forEach(effect => effect.apply(target))
  }

  get template() {
    return html`
      <section class="card__component">
        <h1 class="title">${this.title}</h1>
        <fieldset class="description">
          <legend class="source"><${this.type}></legend>
          <section>
            <ul>
              ${this.descriptions.map(effect => html`<li>${effect}</li>`)}
            </ul>
          </section>
        </fieldset>
        ${
          this.tooltips.length > 0
            ? html` <section class="tooltips">
                ${this.tooltips.map(tooltip => html`<li>${tooltip}</li>`)}
              </section>`
            : ""
        }
      </section>
    `
  }
}
