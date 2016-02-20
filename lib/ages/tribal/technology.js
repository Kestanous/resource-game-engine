const technology = {
  medicine: {
    description: {
      description() {}
    }, 
    prerequisites() { return this.buckets('resources','tribeCount').getValue() >= 7 }
  },
  religion: {
    description: {
      description() {}
    }, 
    prerequisites() { return this.buckets('resources','tribeCount').getValue() >= 7 }
  },
  topography: {
    description: {
      description() {}
    }, 
    prerequisites() { return this.buckets('resources','tribeCount').getValue() >= 7 }
  },
  weaponry: {
    description: {
      description() {}
    }, 
    prerequisites() { return this.buckets('resources','tribeCount').getValue() >= 7 }
  },
  military: {
    description: {
      description() {}
    }, 
    prerequisites() { return this.buckets('resources','tribeCount').getValue() >= 7 }
  },
  trade: {
    description: {
      description() {},
      cost() {
        return {
          understanding: 10
        }
      },
    },
    prerequisites() { return this.buckets('resources','tribeCount').getValue() >= 1 }
  }
}

Game.ages.tribal.buckets.push({
  class: Technology,
  key: 'technology',
  items: technology
})