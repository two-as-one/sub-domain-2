import "core-js/stable"
import "regenerator-runtime/runtime"
import { SubDomainGame } from "./components/SubDomainGame"
import { load } from "./state/state"
import { defineElement } from "./utils/defineElement"

load()

defineElement("sub-domain-game", SubDomainGame)
document.body.appendChild(document.createElement("sub-domain-game"))

document.body.style.padding = 0
document.body.style.margin = 0
document.body.style.backgroundColor = "#000000"
