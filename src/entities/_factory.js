import { Slime } from "./slime.entity"
import { Raider } from "./raider.entity"

export const EntityFactory = function (game, name = "slime") {
  switch (name) {
    case "slime":
      return new Slime(game)
    case "raider":
      return new Raider(game)
  }
}
