import { Scene } from "./_scene"
import StateMachine from "javascript-state-machine"
import { TextOption } from "../controls/controls"
import { set, get } from "../state/state"

export class Identotron extends Scene {
  constructor(game) {
    super(game)
    this._fsm()
  }

  onEnterIntro(transition) {
    if (transition.from === "none") {
      this.game.logger.type(
        "Welcome to the IDENTOTRON-3000. How may I be of assistance?",
      )
    } else {
      this.game.logger.type("Is there anything else I can help you with?")
    }

    this.game.controls.setOptions(
      new TextOption("Adjust my gender.", () => this.changeGender()),
      new TextOption("Swap my class chip.", () => this.changeClass()),
      new TextOption("leave…", () => this.leave()),
    )
  }

  onEnterGenderSelection() {
    this.game.logger.type(
      `Please select your gender. You are currently a ${get("player.gender")}.`,
    )
    this.game.controls.setOptions(
      new TextOption("Man", () => this.chooseGender("man")),
      new TextOption("Woman", () => this.chooseGender("woman")),
      new TextOption("Transman", () => this.chooseGender("transman")),
      new TextOption("Transwoman", () => this.chooseGender("transwoman")),
      new TextOption("Never mind…", () => this.start()),
    )
  }

  onEnterGenderSelected(transition, gender) {
    set("player.gender", gender)

    this.game.logger.type("Assigning gender, please stand by…")
    this.game.controls.clearOptions()
    setTimeout(() => this.start(), 2000)
  }

  onEnterClassSelection() {
    this.game.logger.type(
      `Please select your class. You are currently a  ${get("player.class")}.`,
    )
    this.game.controls.setOptions(
      new TextOption("Fighter", () => this.chooseClass("fighter")),
      new TextOption("Lover", () => this.chooseClass("lover")),
      new TextOption("Never mind…", () => this.start()),
    )
  }

  onEnterClassSelected(transition, playerClass) {
    set("player.class", playerClass)
    this.game.logger.type("Installing new class chip, please stand by…")
    this.game.controls.clearOptions()
    setTimeout(() => this.start(), 2000)
  }

  onEnterOutro() {
    setTimeout(() => this.game.setScene("ship"), 0)
  }
}

StateMachine.factory(Identotron, {
  init: "intro",
  transitions: [
    {
      name: "start",
      from: [
        "none",
        "genderSelection",
        "genderSelected",
        "classSelection",
        "classSelected",
      ],
      to: "intro",
    },
    { name: "changeGender", from: "intro", to: "genderSelection" },
    { name: "chooseGender", from: "genderSelection", to: "genderSelected" },
    { name: "changeClass", from: "intro", to: "classSelection" },
    { name: "chooseClass", from: "classSelection", to: "classSelected" },
    { name: "leave", from: "intro", to: "outro" },
  ],
})

// To visualize this state machine:
// import visualize from "javascript-state-machine/lib/visualize"
// console.log(visualize(Combat))
// then copy and paste output to https://dreampuf.github.io/GraphvizOnline
