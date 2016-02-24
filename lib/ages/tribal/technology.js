const technology = {
  medicine: {
    description: {
      description() {},
      cost() {
        return {
          understanding: 100
        }
      }
    }, 
    prerequisites() { return this.state.buckets('resources','tribeCount').getValue() >= 2 }
  },
  religion: {
    description: {
      description() {}
    }, 
    prerequisites() { return this.state.buckets('resources','tribeCount').getValue() >= 7 }
  },
  topography: {
    description: {
      description() {}
    }, 
    prerequisites() { return this.state.buckets('resources','tribeCount').getValue() >= 7 }
  },
  weaponry: {
    description: {
      description() {}
    }, 
    prerequisites() { return this.state.buckets('resources','tribeCount').getValue() >= 7 }
  },
  military: {
    description: {
      description() {}
    }, 
    prerequisites() { return this.state.buckets('resources','tribeCount').getValue() >= 7 }
  },
  trade: {
    description: {
      description() {},
      cost() {
        return {
          understanding: 50
        }
      },
    },
    prerequisites() { return this.state.buckets('resources','tribeCount').getValue() >= 1 }
  }
}

Game.ages.tribal.buckets.push({
  class: Technology,
  key: 'technology',
  items: technology
})