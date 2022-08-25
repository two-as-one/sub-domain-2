import { html, css, LitElement } from "lit"
import { defineElement } from "../utils/defineElement"
import { scaleNumber } from "../utils/math"
import { GameCard } from "./GameCard"
import anime from "animejs"

defineElement("game-card", GameCard)

export class CardAnimator extends LitElement {
  static styles = css`
    :host {
      color: white;
      pointer-events: none;
      position: absolute;
      z-index: 49;
    }

    :host(:hover) {
      opacity: 0;
    }

    :host(.interactive) {
      pointer-events: all;
    }
  `

  static properties = {
    index: { type: Number },
    total: { type: Number },
    location: { type: String },
  }

  render() {
    return html`<slot></slot>`
  }

  constructor() {
    super()
    this.index = 0
    this.total = 0
    this.location = "deck"
  }

  updated() {
    this.shadowRoot.host.style.zIndex = this.zIndex

    if (this.location === "hand") {
      this.draw()
    }
  }

  get zIndex() {
    if (this.location === "hand") {
      return this.index
    }

    return null
  }

  firstUpdated() {
    anime({
      duration: 0,
      left: -276,
      rotate: -180,
      scale: 0.6,
      targets: this,
      top: 40,
    })
  }

  draw() {
    const left = this.handPosition
    const rotate = scaleNumber(this.index, 0, this.total - 1, -20, 20)

    const radius = 150
    const angle = scaleNumber(this.index, 0, this.total - 1, -45, 45)
    const top = radius - radius * Math.cos((Math.PI * 2 * angle) / 360)

    this.shadowRoot.host.classList.add("interactive")
    anime.remove(this)
    anime({
      duration: 1000,
      easing: "easeOutElastic(1, 1)",
      left,
      rotate,
      scale: 1,
      targets: this,
      top,
    })
  }

  async discard() {
    this.shadowRoot.host.classList.remove("interactive")
    anime.remove(this)
    await anime({
      complete: () => this.dispatchEvent(new CustomEvent("destroyed")),
      duration: 500,
      easing: "easeInOutQuart",
      left: { value: 576, easing: "easeOutCubic" },
      rotate: { value: 180, easing: "linear", duration: 300 },
      scale: 0.6,
      targets: this,
      top: 40,
    }).finished
  }

  async shuffle() {
    this.shadowRoot.host.classList.remove("interactive")
    anime.remove(this)
    await anime({
      duration: 750,
      left: -276,
      rotate: -180,
      easing: "easeOutQuint",
      scale: 0.6,
      targets: this,
      top: 40,
    }).finished
  }

  async play() {
    this.shadowRoot.host.classList.remove("interactive")
    anime.remove(this)
    await anime({
      duration: 750,
      easing: "easeOutElastic(1, 1)",
      rotate: 0,
      scale: 1.2,
      targets: this,
      top: -350,
      left: { value: 330, easing: "easeOutCubic" },
    }).finished

    await this.discard()
  }

  get handPosition() {
    const fanSize = [75, 75, 75, 150][this.total] || 200
    return (
      scaleNumber(this.index, 0, this.total - 1, -fanSize, fanSize) -
      100 + // card width / 2
      250 // hand width / 2
    )
  }
}
