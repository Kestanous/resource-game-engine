const tribes = {
  tribeOne: {
    prerequisites() { 
      if (this.state.buckets('resources','tribeCount').getValue() > 0 ) {
        this._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeTwo: {
    prerequisites() { 
      if (this.state.buckets('resources','tribeCount').getValue() > 1 ) {
        this._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeThree: {
    prerequisites() { 
      if (this.state.buckets('resources','tribeCount').getValue() > 2 ) {
        this._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeFour: {
    prerequisites() { 
      if (this.state.buckets('resources','tribeCount').getValue() > 3 ) {
        this._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeFive: {
    prerequisites() { 
      if (this.state.buckets('resources','tribeCount').getValue() > 4 ) {
        this._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeSix: {
    prerequisites() { 
      if (this.state.buckets('resources','tribeCount').getValue() > 5 ) {
        this._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeSeven: {
    prerequisites() { 
      if (this.state.buckets('resources','tribeCount').getValue() > 6 ) {
        this._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeEight: {
    prerequisites() { 
      if (this.state.buckets('resources','tribeCount').getValue() > 7 ) {
        this._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeNine: {
    prerequisites() { 
      if (this.state.buckets('resources','tribeCount').getValue() > 8 ) {
        this._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeTen: {
    prerequisites() { 
      if (this.state.buckets('resources','tribeCount').getValue() > 9 ) {
        this._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeEleven: {
    prerequisites() { 
      if (this.state.buckets('resources','tribeCount').getValue() > 10 ) {
        this._dict.set('unlocked', true)
        return true
      }
    }
  },
  tribeTwelve: {
    prerequisites() { 
      if (this.state.buckets('resources','tribeCount').getValue() > 11 ) {
        this._dict.set('unlocked', true)
        return true
      }
    }
  }
}
import {Tribe} from 'meteor/private:game-engine';
Ages.tribal.buckets.push({
  class: Tribe,
  key: 'tribes',
  items: tribes
})