import { html } from "lit-html"
import "./_card.sass"

export class Card {
  constructor(game, config) {
    this.game = game
    this.config = config

    if (this.config.bottom && !this.config.top) {
      throw Error("Card is missing top side")
    }
    if (this.config.top && !this.config.bottom) {
      throw Error("Card is missing bottom side")
    }
  }

  get title() {
    return this.config.title || "[NO_NAME]"
  }

  get isSplit() {
    return Boolean(this.config.top && this.config.bottom)
  }

  describe(config) {
    const effects = []

    if (config.damage) {
      effects.push(`Deal [${config.damage}] damage.`)
    }

    if (config.block) {
      effects.push(`Block [${config.block}].`)
    }

    if (config.heal) {
      effects.push(`Heal [${config.heal}].`)
    }

    if (config.combat) {
      effects.push("Enter combat stance.")
    }

    if (config.foreplay) {
      effects.push("Enter foreplay stance.")
    }

    return effects.join()
  }

  apply(scene, config) {
    if (config.damage) {
      scene.enemy.damage(config.damage)
    }

    if (config.heal) {
      scene.player.heal(config.heal)
    }

    if (config.block) {
      scene.player.block(config.block)
    }

    if (config.foreplay) {
      scene.stance = "foreplay"
    }

    if (config.combat) {
      scene.stance = "combat"
    }
  }

  play(scene) {
    if (this.isSplit) {
      if (scene.stance === "foreplay") {
        this.apply(scene, this.config.bottom)
      } else {
        this.apply(scene, this.config.top)
      }
    } else {
      this.apply(scene, this.config)
    }
  }

  get template() {
    return html`
      <div class="card">
        <h1 class="title">${this.title}</h1>
        ${this.isSplit
          ? html`<section class="split">
              <section class="top">
                <p>Combat: ${this.describe(this.config.top)}</p>
              </section>
              <section class="bottom">
                <p>Foreplay: ${this.describe(this.config.bottom)}</p>
              </section>
            </section>`
          : html`<section class="normal">
              <section>
                <p>${this.describe(this.config)}</p>
              </section>
            </section>`}
      </div>
    `
  }
}
