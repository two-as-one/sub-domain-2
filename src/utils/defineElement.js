export const defineElement = function (name, Element) {
  if (!customElements.get(name)) {
    customElements.define(name, Element)
  }
}
