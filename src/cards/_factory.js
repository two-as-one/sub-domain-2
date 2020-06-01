import { Anus } from "./anus.card"
import { Block } from "./block.card"
import { Cock } from "./cock.card"
import { Grope } from "./grope.card"
import { Kick } from "./kick.card"
import { Nut } from "./nut.card"
import { Relax } from "./relax.card"
import { Slap } from "./slap.card"

const CARDS = [Anus, Block, Cock, Grope, Kick, Nut, Relax, Slap]

export const cardFactory = function (game, config = {}) {
  const Card = CARDS.find(Card => Card.defaults.title === config.title)

  if (!Card) {
    throw Error(`No card named ${config.title} exists`)
  }

  config = Object.assign({}, JSON.parse(JSON.stringify(Card.defaults)), config)

  return new Card(game, config)
}
