const actions = {
  explore: {
    description: {
      effect() {
        if (this.state.buckets('resources', 'tribeCount').getValue() <= this.getModifier('tribeLimit', 6)) {
         this.state.buckets('resources', 'tribeCount').updateValue(1)
         log.message('You found a tribe.')
        }
      },
      waitTime() {
        return 5;
      },
      disable() {
        return this.state.buckets('resources', 'tribeCount').getValue() >= this.getModifier('tribeLimit', 6)
      },
      description() {}
    }
  },
  forge: {
    description: {
      description() {}
    }, 
    prerequisites() { return false }
  }
}

Game.ages.tribal.buckets.push({
  class: Action,
  key: 'actions',
  items: actions
})