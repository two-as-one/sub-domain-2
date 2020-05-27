- The player has two stances they can be in combat / foreplay
- cards can have different top / bottom actions depending on the stance the player is in
- example:

  - kick
    top: deal x damage
    bottom: enter combat stance

  - cock
    top: deal x damage
    bottom: deal x \* 2 damage

- enemies have a single HP bar, but keep track of combat and foreplay damage internally
- current hp = maxHp - damage - foreplayDamage
- enemies may adjust their AI based on whether they were damaged via foreplay or combat
- combat rewards may be adjusted as well

## example enemy actions

- damage X
- damage X x Y
- block X
- switch stance
- combination of the above

## undecided

- different rewards based on final stance?
