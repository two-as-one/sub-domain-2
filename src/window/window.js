import { html, render } from "lit-html"
export class Window {
  constructor(game) {
    this.game = game
    this.el = document.createElement("section")
    this.el.classList.add("window")
    this.fps = 1000 / 60
    this.loop()
  }

  async loop() {
    await new Promise(r => setTimeout(r, this.fps))

    this.render()
    this.loop()
  }

  render() {
    render(template(this.game), this.el)
  }
}

const template = game => html`
  <p><label>stance:</label> ${game.scene.stance}</p>
  ${debugEntity(game.player)}
  ${game.scene.enemy ? debugEntity(game.scene.enemy) : ""}
`
const debugEntity = entity => html`
  <section class="debug-entity">
    <h1>${entity.name}</h1>
    <ul>
      <li><label>hp:</label> ${entity.health} / ${entity.maxHealth}</li>
      <li><label>block:</label> ${entity.__block}</li>
      <li><label>anticipation:</label> ${entity.__anticipation}</li>
    </ul>
  </section>
`
