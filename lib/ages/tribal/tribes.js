const tribes = {
  tribeOne: {
    prerequisites(self) { 
      if (this.buckets('resources','tribeCount').getValue() > 0 ) {
        self._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeTwo: {
    prerequisites(self) { 
      if (this.buckets('resources','tribeCount').getValue() > 1 ) {
        self._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeThree: {
    prerequisites(self) { 
      if (this.buckets('resources','tribeCount').getValue() > 2 ) {
        self._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeFour: {
    prerequisites(self) { 
      if (this.buckets('resources','tribeCount').getValue() > 3 ) {
        self._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeFive: {
    prerequisites(self) { 
      if (this.buckets('resources','tribeCount').getValue() > 4 ) {
        self._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeSix: {
    prerequisites(self) { 
      if (this.buckets('resources','tribeCount').getValue() > 5 ) {
        self._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeSeven: {
    prerequisites(self) { 
      if (this.buckets('resources','tribeCount').getValue() > 6 ) {
        self._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeEight: {
    prerequisites(self) { 
      if (this.buckets('resources','tribeCount').getValue() > 7 ) {
        self._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeNine: {
    prerequisites(self) { 
      if (this.buckets('resources','tribeCount').getValue() > 8 ) {
        self._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeTen: {
    prerequisites(self) { 
      if (this.buckets('resources','tribeCount').getValue() > 9 ) {
        self._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeEleven: {
    prerequisites(self) { 
      if (this.buckets('resources','tribeCount').getValue() > 10 ) {
        self._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeTwelve: {
    prerequisites(self) { 
      if (this.buckets('resources','tribeCount').getValue() > 11 ) {
        self._dict.set('unlocked', true)
        return true
      }
    }
  }
}

Game.ages.tribal.buckets.push({
  class: Tribe,
  key: 'tribes',
  items: tribes
})