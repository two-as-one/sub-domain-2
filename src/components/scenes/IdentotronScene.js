import StateMachine from "javascript-state-machine"
import { set, get } from "../../state/state"
import { Scene } from "./_Scene"

export class IdentotronScene extends Scene {
  onEnterIntro(transition) {
    this.chat.type(
      transition.from === "none"
        ? "Welcome to the IDENTOTRON-3000. How may I be of assistance?"
        : "Is there anything else I can help you with?"
    )

    this.options = [
      { text: "Adjust my gender.", fn: () => this.changeGender() },
      { text: "Swap my class chip.", fn: () => this.changeClass() },
      { text: "leave…", fn: () => this.leave() },
    ]
  }

  onEnterGenderSelection() {
    this.chat.type(
      `Please select your gender. You are currently a ${get("player.gender")}.`
    )

    this.options = [
      { text: "Man", fn: () => this.chooseGender("man") },
      { text: "Woman", fn: () => this.chooseGender("woman") },
      { text: "Transman", fn: () => this.chooseGender("transman") },
      { text: "Transwoman", fn: () => this.chooseGender("transwoman") },
      { text: "Never mind…", fn: () => this.start() },
    ]
  }

  onEnterGenderSelected(transition, gender) {
    set("player.gender", gender)
    this.chat.type("Assigning gender, please stand by…")
    this.options = []
    setTimeout(() => this.start(), 2000)
  }

  onEnterClassSelection() {
    this.chat.type(
      `Please select your class. You are currently a  ${get("player.class")}.`
    )
    this.options = [
      { text: "Fighter", fn: () => this.chooseClass("fighter") },
      { text: "Lover", fn: () => this.chooseClass("lover") },
      { text: "Never mind…", fn: () => this.start() },
    ]
  }

  onEnterClassSelected(transition, playerClass) {
    set("player.class", playerClass)
    this.chat.type("Installing new class chip, please stand by…")
    this.options = []
    setTimeout(() => this.start(), 2000)
  }

  onEnterOutro() {
    setTimeout(() => this.game.setScene("ship"), 0)
  }
}

StateMachine.factory(IdentotronScene, {
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
