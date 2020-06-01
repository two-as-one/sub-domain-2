import "core-js/stable"
import "regenerator-runtime/runtime"
import { Game } from "./game/game"
import { load } from "./state/state"

load()
const game = new Game()
window.game = game
