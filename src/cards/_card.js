import { html } from "lit-html"
import "./_card.sass"

export class Card {
  constructor(game, config) {
    this.game = game
    this.config = config
    this.config.keywords = config.keywords || []
  }

  get title() {
    return this.config.title || "[NO_NAME]"
  }

  hasKeyword(word) {
    return this.config.keywords.includes(word)
  }

  get nut() {
    return this.config.nut || 0
  }

  get pain() {
    let val = this.config.pain || 0

    if (this.game.scene.stance === "combat") {
      val *= 2
    }

    return val
  }

  get love() {
    let val = this.config.love || 0

    if (this.hasKeyword("penis")) {
      val += this.game.player.nut
    }

    if (this.game.scene.stance === "foreplay") {
      val *= 2
    }

    return val
  }

  get block() {
    return this.config.block || 0
  }

  get heal() {
    return this.config.heal || 0
  }

  describe() {
    const effects = []

    if (this.nut) {
      effects.push(`Nut ${this.nut}.`)
    }

    if (this.pain) {
      let val = this.pain

      if (val === this.config.pain) {
        effects.push(`Deal ${this.pain} pain.`)
      } else {
        effects.push(html`Deal <strong>${this.pain}</strong> pain.`)
      }
    }

    if (this.love) {
      let val = this.love

      if (val === this.config.love) {
        effects.push(`Deal ${this.love} love.`)
      } else {
        effects.push(html`Deal <strong>${this.love}</strong> love.`)
      }
    }

    if (this.block) {
      effects.push(`Block ${this.block}.`)
    }

    if (this.heal) {
      effects.push(`Heal ${this.heal}.`)
    }

    if (this.config.combat) {
      effects.push(`Enter combat stance.`)
    }

    if (this.config.foreplay) {
      effects.push(`Enter foreplay stance.`)
    }

    return effects
  }

  apply(scene) {
    if (this.nut) {
      this.game.player.nut += this.nut
    }

    if (this.pain) {
      scene.enemy.damage(this.pain, "pain")
    }

    if (this.love) {
      scene.enemy.damage(this.love, "love")

      if (this.hasKeyword("penis")) {
        this.game.player.nut = 0
      }
    }

    if (this.heal) {
      scene.player.heal(this.heal)
    }

    if (this.block) {
      scene.player.block(this.block)
    }

    if (this.config.foreplay) {
      scene.stance = "foreplay"
    }

    if (this.config.combat) {
      scene.stance = "combat"
    }
  }

  play(scene) {
    this.apply(scene)
  }

  get template() {
    return html`
      <div class="card">
        <h1 class="title">${this.title}</h1>
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
