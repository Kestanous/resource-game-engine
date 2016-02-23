class Game {
  constructor(startingAge) {
    Mixins.buckets(this)
    this.interval =  Session.get('interval');
    this.ready = new ReactiveVar(false);
    this.running = new ReactiveVar(false);
    this._startingAge = startingAge
    this.currentAge = amplify.store('dagame-age') || startingAge;
    if (this.currentAge == 'advance') { //this should never happen but it is a possibility
      this.currentAge = startingAge;
    }
    this._NeedsTick = [];
  }
  start() {
    this.loadAge(this.currentAge, () => { this.play() })
  }
  stop() {
    this.pause()
    this.removeAge()
  }
  play() {
    if (!this.ready.get()) return 
    this.pause(); //clean up if needed
    this._intervalId = Meteor.setInterval(() => {this.onTick()}, Session.get('interval') * 1000 );
    this.running.set(true)
  }
  pause() { 
    Meteor.clearInterval(this._intervalId)
    this.running.set(false)
  }
  save() {
    let saveObj = {}
    for (let bucket in this._buckets) {
      for (let key in this._buckets[bucket]) {
        let save = this._buckets[bucket][key].save();
        if (save) { 
          if (!saveObj[bucket]) { saveObj[bucket] = {} }
          saveObj[bucket][key] = save
        }
      }
    }
    amplify.store('dagame-age', this.currentAge)
    amplify.store('dagame', saveObj)
  }
  load(age) {
    let load = amplify.store('dagame-age');
    if (!load) {
      return {};
    }
    if (load == age) {
      return { load: amplify.store('dagame') };
    }
    if (load = 'advance') {
     return { load: amplify.store('dagame'), advance: true }; 
    }
  }
  onGameOver() { }
  gameOver() {
    this.stop()
    amplify.store('dagame-age')
    amplify.store('dagame', {})
    this.onGameOver()
  }
  reset() {
    amplify.store('dagame', {})
    this.advanceAge(this._startingAge)
  }
  loadAge(age, callback) {
    this.removeAge()
    this.currentAge = age
    let loadAge = this.load(age) || {};
    Game.ages[age].buckets.forEach((bucket) => {
      for (let item in bucket.items) {
        let itemData;
        if (loadAge.load[bucket.key]) itemData = loadAge.load[bucket.key][item]
        this.addItem(item, bucket.key, bucket.class, bucket.items[item].description, bucket.items[item].prerequisites, itemData, loadAge.advance)
      } 
    });
    this.ready.set(true);
    if (callback) { callback() }
  }
  advanceAge(next) {
    this.save()
    amplify.store('dagame-age', 'advance')
    this.stop()
    this.ready.set(false);
    Tracker.afterFlush(() => {
      this.loadAge(next, () => { this.play() })
    });
  }
  removeAge() {
    if (this.currentAge) {
      this.ready.set(false)
      for (let bucket in this._buckets) {
        this.emptyBucket(bucket)
      }

      log.clear()
      this._NeedsTick = []
    }
  }
  onTick() { 
    for (let i = this._NeedsTick.length - 1; i >= 0; i--) {
      this._NeedsTick[i].tick()
    }
  }
  canPay(cost) { return _.every(cost, (value, key) => this.buckets('resources', key).getValue() >= value ) }
  pay(cost) {
    if (this.canPay(cost)) {
      Tracker.nonreactive( () => {
        _.each(cost, (value, key) => this.buckets('resources', key).updateValue(-value) )
      });
      return true
    } else return false
  }
}
Game.tickNumber = (value) => {
  return numeral(value / Session.get('interval')).format('+0.00a') + '/s'
}
Game.ages = {}
this.Game = Game;
log = new Meteor.Collection(null)
log.count = -15
log.message = (message, color) => {
  log.insert({message, color, time: new Date()})
  if (++log.count > 100) {
    log.remove(log.find({}, {limit: 1, sort: {time: 1}, fields: {_id: 1}}).fetch()._id)
  }
}
log.clear = () => {
  log.find().forEach((l) => {
    log.remove(l._id)
  })
}