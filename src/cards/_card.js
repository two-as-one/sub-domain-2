import { html } from "lit-html"

export class Card {
  constructor(game) {
    this.game = game
  }

  get title() {
    return "card title"
  }

  get text() {
    return "card text"
  }

  get keywords() {
    return []
  }

  foreplay() {}
  combat() {}

  play(scene) {
    if (scene.stance === "foreplay") {
      this.foreplay(scene)
    } else {
      this.combat(scene)
    }
  }

  get template() {
    return html`
      <div class="card">
        <h1>${this.title}</h1>
        <div>${this.text}</div>
      </div>
    `
  }
}
