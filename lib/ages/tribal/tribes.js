const tribes = {
  tribeOne: {
    prerequisites() { return this.buckets('resources','tribeCount').getValue() > 0 }
  },
  tribeTwo: {
    prerequisites() { return this.buckets('resources','tribeCount').getValue() > 1 }
  },
  tribeThree: {
    prerequisites() { return this.buckets('resources','tribeCount').getValue() > 2 }
  },
  tribeFour: {
    prerequisites() { return this.buckets('resources','tribeCount').getValue() > 3 }
  },
  tribeFive: {
    prerequisites() { return this.buckets('resources','tribeCount').getValue() > 4 }
  },
  tribeSix: {
    prerequisites() { return this.buckets('resources','tribeCount').getValue() > 5 }
  },
  tribeSeven: {
    prerequisites() { return this.buckets('resources','tribeCount').getValue() > 6 }
  },
  tribeEight: {
    prerequisites() { return this.buckets('resources','tribeCount').getValue() > 7 }
  },
  tribeNine: {
    prerequisites() { return this.buckets('resources','tribeCount').getValue() > 8 }
  },
  tribeTen: {
    prerequisites() { return this.buckets('resources','tribeCount').getValue() > 9 }
  },
  tribeEleven: {
    prerequisites() { return this.buckets('resources','tribeCount').getValue() > 10 }
  },
  tribeTwelve: {
    prerequisites() { return this.buckets('resources','tribeCount').getValue() > 11 }
  }
}

Game.ages.tribal.buckets.push({
  class: Tribe,
  key: 'tribes',
  items: tribes
})