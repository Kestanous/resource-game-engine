const actions = {
  expolore: {
    description: {
      effect() {
        let frac = Random.fraction()
        , count = Math.floor(Random.fraction() * 5) + 1
        , tribeMax = 0.1
        , shinyMax = 0.8
        , herbMax = 0.9;
        if (this.state.buckets('resources', 'tribeCount').getValue() >= 6) {
          tribeMax = 0
        }

        if (frac < tribeMax) {
          this.state.buckets('resources', 'tribeCount').updateValue(1)
          log.message('You found a tribe.')
        }
        if (frac > tribeMax && frac < shinyMax) {
          this.state.buckets('resources', 'shinies').updateValue(count)
          log.message(`You found ${count} shinies.`)
        }
        if (frac > shinyMax && frac < herbMax) {
          this.state.buckets('resources', 'herbs').updateValue(count)
          log.message(`You found ${count} herbs.`)
        }
        if (frac > herbMax ) {
          this.state.buckets('resources', 'food').updateValue(count)
          log.message(`You found ${count} food.`)
        }
      },
      waitTime() {
        return 2;
      },
      description() {}
    }
  },
  farm: {
    description: {
      description() {}
    }, 
    prerequisites() { return false }
  },
  excavation: {
    description: {
      description() {}
    }, 
    prerequisites() { return false }
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