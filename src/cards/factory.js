import CONFIG from "../config.yaml"
import { Card } from "./card.js"

export const cardFactory = function (game, search = {}) {
  let config = Object.values(CONFIG.cards).find((c) => c.title === search.title)

  if (!config) {
    console.error(`No card named ${search.title} exists`)
    config = CONFIG.cards.oops
  }

  return new Card(
    game,
    Object.assign({}, JSON.parse(JSON.stringify(config)), search)
  )
}
