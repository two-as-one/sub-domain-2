import { Scene } from "./_scene"
import StateMachine from "javascript-state-machine"
import { TextOption } from "../controls/controls"
import { get, set } from "../state/state"

export class CharacterCreation extends Scene {
  constructor(game) {
    super(game)
    this._fsm()
  }

  onEnterIntro() {
    this.game.logger.type("What do you identify as?")
    this.game.controls.setOptions(
      ...this.game.chance.shuffle([
        new TextOption(`Man`, () => this.chooseGender("man")),
        new TextOption(`Woman`, () => this.chooseGender("woman")),
        new TextOption(`Transman`, () => this.chooseGender("transman")),
        new TextOption(`Transwoman`, () => this.chooseGender("transwoman")),
      ]),
    )
  }

  onEnterGender(transition, gender) {
    const deck = get("player.cards")
    switch (gender) {
      case "man":
        deck.push(
          { title: "Anus" },
          { title: "Cock" },
          { title: "Nut" },
          { title: "Nut" },
        )
        break
      case "woman":
        deck.push(
          { title: "Anus" },
          { title: "Pussy" },
          { title: "Boob" },
          { title: "Boob" },
        )
        break
      case "transman":
        deck.push({ title: "Anus" }, { title: "Pussy" })
        break
      case "transwoman":
        deck.push(
          { title: "Anus" },
          { title: "Cock" },
          { title: "Nut" },
          { title: "Nut" },
          { title: "Boob" },
          { title: "Boob" },
        )
        break
    }
    set("player.cards", deck)

    this.game.logger.type("Choose your specialisation.")
    this.game.controls.setOptions(
      new TextOption(`Fighter`, () => this.chooseClass("fighter")),
      new TextOption(`Lover`, () => this.chooseClass("lover")),
    )
  }

  onEnterClass(transition, playerClass) {
    const deck = get("player.cards")
    switch (playerClass) {
      case "fighter":
        deck.push(
          { title: "Block" },
          { title: "Block" },
          { title: "Kick" },
          { title: "Kick" },
          { title: "Slap" },
          { title: "Slap" },
        )
        break
      case "lover":
        deck.push(
          { title: "Block" },
          { title: "Block" },
          { title: "Grope" },
          { title: "Grope" },
          { title: "Kiss" },
          { title: "Kiss" },
        )
        break
    }
    set("player.cards", deck)

    this.game.logger.type("All set! Time to go on an adventure.")
    this.game.controls.setOptions(new TextOption(`Yay!`, () => this.leave()))
  }

  onEnterOutro() {
    this.game.logger.type("SUBDOMAIN 2")
    this.game.controls.clearOptions()
    console.log(get("player.cards"))
    setTimeout(() => this.game.setScene("expedition"), 2000)
  }
}

StateMachine.factory(CharacterCreation, {
  init: "intro",
  transitions: [
    { name: "start", from: "none", to: "intro" },
    { name: "chooseGender", from: "intro", to: "gender" },
    { name: "chooseClass", from: "gender", to: "class" },
    { name: "leave", from: "class", to: "outro" },
  ],
})

// To visualize this state machine:
// import visualize from "javascript-state-machine/lib/visualize"
// console.log(visualize(Combat))
// then copy and paste output to https://dreampuf.github.io/GraphvizOnline
