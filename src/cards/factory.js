import CONFIG from "../config.yaml"
import { Card } from "./card.js"

export const cardFactory = function (game, search = {}) {
  let pair = Object.entries(CONFIG.cards).find(
    (pair) => pair[1].title === search.title
  )

  if (!pair) {
    console.error(`No card named ${search.title} exists`)
    pair = ["oops", CONFIG.cards.oops]
  }

  return new Card(
    game,
    Object.assign({ key: pair[0] }, JSON.parse(JSON.stringify(pair[1])), search)
  )
}
