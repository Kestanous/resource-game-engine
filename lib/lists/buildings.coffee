@ModifiersList = [
  {
    name: 'hunters'
    cost:
      food: 10
    onTick:
      add:
        food: 1
      # modify: percentage modification
      
    # gives: static addition
    unlockOn: [] #"basic" tech
    depricateTo: 'plantations' #when plantations are active, allow upgrade
  }

]