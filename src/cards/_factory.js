import { Anus } from "./anus.card"
import { Block } from "./block.card"
import { Breast } from "./breast.card"
import { Grope } from "./grope.card"
import { Kick } from "./kick.card"
import { Kiss } from "./kiss.card"
import { Penis } from "./Penis.card"
import { Relax } from "./relax.card"
import { Slap } from "./slap.card"
import { Testicle } from "./testicle.card"
import { Vagina } from "./vagina.card"

const CARDS = [
  Anus,
  Block,
  Breast,
  Grope,
  Kick,
  Kiss,
  Penis,
  Relax,
  Slap,
  Testicle,
  Vagina,
]

export const cardFactory = function (game, config = {}) {
  const Card = CARDS.find(Card => Card.defaults.title === config.title)

  if (!Card) {
    throw Error(`No card named ${config.title} exists`)
  }

  config = Object.assign({}, JSON.parse(JSON.stringify(Card.defaults)), config)

  return new Card(game, config)
}
