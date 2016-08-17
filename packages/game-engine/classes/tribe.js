import {Resource} from './resource.js'
class Tribe extends Resource {
  constructor(config, state) {
    super(config, state)
    this._name = Tribe.randomName()
    this._dict = new ReactiveDict()
    this.autorun( c => {
      if (this.atLimit()) {
        let rand = Random.fraction(), strength = this._dict.get('strength');
        if (this.disposition() == 'hostile') {
          this.state.buckets('resources', 'shelter').updateValue(-1)
          log.message(`Tribe ${this.name()} attacked you! They burned down one of your shelters`, 'warning')
          let needs = this._dict.get('needs')
          if (this.state.buckets('resources', needs).getValue()) {
            let count = Math.floor(strength * rand + 1 * strength)
            , delta = this.state.buckets('resources', needs).updateValue( - count );
            log.message(`Their raiders took ${Math.abs(delta || count)} ${needs}`, 'warning')
            if (strength < 10) { this._dict.set('strength', strength + 1 ) }
          }
        } else if (this.disposition() == 'friendly') {
          let offers = this._dict.get('offers')
          , count = Math.floor(strength * rand + 1 * strength)
          , delta = this.state.buckets('resources', offers).updateValue( count );
          log.message(`Tribe ${this.name()} sent you tribute! They gave you ${Math.abs(delta || count)} ${offers}`, 'info')
        }
        this.setValue(1)
      }
    });
    this.autorun( c => {
      if (this.disposition() == 'neutral') {
        this.setValue(null)
      }
    })
    this.autorun( c => {
      if (this._dict.get('unlocked')) {
        this._dict.set('disposition', - Math.floor( Random.fraction() * 100) )
        let resource = ['food', 'scrap', 'animal parts', 'herbs'], needs = Random.choice(resource)
        resource.splice(resource.indexOf(needs), 1)
        this._dict.set('needs', needs )
        this._dict.set('offers', Random.choice(resource) )
        this._dict.set('strength', this.state.buckets('resources', 'tribeCount').getValue() )
        c.stop()
      }
    })
  }
  calculateMax() {
    return 100
  }
  calculateMin() {
    return 0
  }
  calculateTick() {
    let disposition = this.disposition()
    if (disposition && disposition != 'neutral') {
      return this._dict.get('strength') * 0.1
    }
  }
  bribe() {
    if (this.state.pay({shinies: 50})) { 
      let disposition = this._dict.get('disposition') + 10;
      this.setValue(1)
      if (disposition < 100) {
        this._dict.set('disposition', disposition)
      } else {
        this._dict.set('disposition', 100)
      }
    }
  }
  canBribe() {
    return isFinite(this._dict.get('disposition')) && (this._dict.get('disposition') < 100)
  }
  bribeNotReady() {
    return !this.state.canPay({shinies: 50})
  }  
  trade() {
    if (this.tradeNotReady()) { return }
    if (this.disposition() == 'neutral') { 
      cost = 10
    } else if (this.disposition() == 'friendly') { 
      cost = 5
    } else {
      return
    }
    this.state.buckets('resources', this._dict.get('needs')).updateValue(-cost)
    this.state.buckets('resources', this._dict.get('offers')).updateValue(5)
    let disposition = this._dict.get('disposition') + 5;
    if (disposition < 100) {
      this._dict.set('disposition', disposition)
    } else {
      this._dict.set('disposition', 100)
    }

    log.message(`You traided ${cost} ${this._dict.get('needs')} for 5 ${this._dict.get('offers')} with the ${this.name()} Tribe`, 'info')
  }
  canTrade() {
    return this.state.buckets('technology', 'trade').owned() && this._dict.get('disposition') > -30
  }
  canSeeTrade() {
    return this.state.buckets('technology', 'trade').owned()
  }
  tradeNotReady() {
    if (this.disposition() == 'neutral') { 
      let need = {}
      need[this._dict.get('needs')] = 10
      return !this.state.canPay(need) 
    }
    if (this.disposition() == 'friendly') { 
      let need = {}
      need[this._dict.get('needs')] = 5
      return !this.state.canPay(need) 
    }
  }
  needs() {
    return this._dict.get('needs')
  }
  offers() {
    return this._dict.get('offers')
  }
  attack() {
    if (this.attackNotReady()) { return }
    let rand = Random.fraction(), strength = this._dict.get('strength'), disposition = this._dict.get('disposition') - 10;
    if (disposition > -100) {
      this._dict.set('disposition',  disposition )
    } else {
      this._dict.set('disposition',  -100 )
    }

    if (rand > 0.95) {
      strength = Math.floor(strength - this.state.buckets('resources', 'combat capacity').getValue() * .1)
      if (strength >= 1) { 
        this._dict.set('strength', strength) 
        log.message(`Tribe ${this.name()} was greatly damaged!`, 'info')
      } else {
        this.destroy()
        log.message(`Tribe ${this.name()} was distroyed!`, 'info')
      }
    } else {
      let offers = this._dict.get('offers')
      , count = Math.floor(strength * rand + 1 * strength)
      this.state.buckets('resources', offers).updateValue( count );
      log.message(`You raided tribe ${this.name()}! Your raiders took ${Math.abs(count)} ${offers}.`, 'info')
    }
    return this.state.buckets('resources', 'attackCount').setValue(0)
  }
  canAttack() {
    return this.disposition() != undefined
  }
  attackCount() {
    return this.state.buckets('resources', 'attackCount').getValue()
  }
  attackNotReady() {
   return !this.state.buckets('resources', 'attackCount').atLimit() 
  }
  merge() {
    let strength = this._dict.get('strength')
    , offers = this._dict.get('offers')
    , resources = this.state.buckets('resources')
    , tribes = resources.shelter.getModifier('tribes', 0)
    shelters = tribes + strength;
    console.log(shelters, strength)
    resources.shelter.setModifier('tribes', shelters)
    Tracker.afterFlush( () => {
      resources.shelter.updateValue(strength)
      Tracker.afterFlush( () => {
        resources[offers].updateValue(strength * 100)
        resources.people.updateValue(strength * 5)
      });
    });
    this.destroy()
    log.message(`you merged with the ${this.name()} tribe and gained 
      ${strength} shelters,
      ${strength * 100} ${offers},
      and ${strength * 5} people!
    `)
  }
  canMerge() {
    return this._dict.get('disposition') == 100
  }
  disposition() {
    let value = this._dict.get('disposition');
    if (value < -30) {
      return 'hostile'
    } else if (value <= 30) {
      return 'neutral'
    } else if (value > 30) {
      return 'friendly'
    }
  }
  dispositionValue() {
    return this._dict.get('disposition')
  }
  destroy() {
    this.state._NeedsTick.splice(this.state._NeedsTick.indexOf(this), 1);
    this._dict.set('destroyed', true)
    this._dict.set('disposition', null)
    this.setValue(false)
  }
  isDestroyed() {
    return this._dict.get('destroyed')
  }
  save() {
    
  }
}

Tribe.randomName = () => {
  if (names.length) {
    return names.splice(Random.choice(Array.from(new Array(names.length - 1), (x,i) => i)), 1)[0]
  } else {
    return 'needs more names'
  }
}

let names = [
  'Blue Bat',
  'Mute Scorpion',
  'Small Wing',
  'Large Forest',
  'Gray Angel',
  'Cruel Boulder',
  'Silver Lake',
  'Rapid Eagle',
  'Standing Spider',
  'High Phantom',
  'Rising Ember',
  'Sapphire Owl'
]


export {Tribe};