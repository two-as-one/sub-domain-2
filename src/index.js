import "core-js/stable"
import "regenerator-runtime/runtime"
import { Game } from "./game/game"

const game = new Game()
window.game = game
document.body.appendChild(game.el)
