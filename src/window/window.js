import { html, render } from "lit-html"
export class Window {
  constructor(game) {
    this.game = game
    this.el = document.createElement("section")
    this.el.classList.add("window")
    this.render()
  }
  render() {
    render(template(this), this.el)
  }
}

const template = () => html` PLACEHOLDER `
