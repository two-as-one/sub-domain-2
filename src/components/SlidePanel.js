import { html, css, LitElement } from "lit"

export class SlidePanel extends LitElement {
  static styles = css`
    :host {
      align-items: flex-start;
      display: flex;
      flex-direction: row;
      height: 100%;
      inset: 0;
      justify-content: flex-start;
      position: absolute;
      transform: translateX(100%);
      transition: transform 0.25s ease-in-out;
      width: 100%;
      z-index: 10;
    }

    :host(.right) {
      transform: translateX(100%);
    }

    :host(.left) {
      transform: translateX(-100%);
    }

    :host(.visible) {
      transform: translateX(0%);
    }

    .overlay {
      backdrop-filter: blur(2px);
      background-color: rgba(0, 0, 0, 0.5);
      inset: 0;
      position: absolute;
      z-index: 1;
    }

    .content {
      box-sizing: border-box;
      max-height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      width: 100%;
      z-index: 2;
    }
  `

  static properties = {
    isVisible: { state: true },
  }

  render() {
    if (this.isVisible) {
      this.classList.add("visible")
    } else {
      this.classList.remove("visible")
    }

    return html`
      <div class="overlay"></div>
      <div class="content">
        <slot></slot>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    addEventListener("keydown", this.onKeyDown)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener("keydown", this.onKeyDown)
  }

  constructor() {
    super()
    this.cards = []
    this.onKeyDown = () => this.hide()
  }

  show() {
    this.isVisible = true
  }

  hide() {
    this.isVisible = false
  }

  toggle() {
    if (this.isVisible) {
      this.hide()
    } else {
      this.show()
    }
  }
}
