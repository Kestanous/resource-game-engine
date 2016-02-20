class Game {
  constructor(savedGame) {
    Mixins.buckets(this)
    this.interval =  Session.get('interval');
    this.ready = new ReactiveVar(false)
    this.running = new ReactiveVar(false)
    this.currentAge = 'scavenger'
    this._NeedsTick = []
  }
  start() {
    GAME.loadAge(this.currentAge, () => { this.play() })
  }
  stop() {
    this.pause()
    GAME.removeAge()
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
  onGameOver() { }
  gameOver() {
    this.stop()
    this.onGameOver()
  }
  onAgeEnd() { }
  loadAge(age, callback) {
    this.removeAge()
    this.currentAge = age
    Game.ages[age].buckets.forEach((bucket) => {
      for (let item in bucket.items) {
        this.addItem(item, bucket.key, bucket.class, bucket.items[item].description, bucket.items[item].prerequisites)
      } 
    });
    Tracker.afterFlush(() => {
      this.ready.set(true)
      Tracker.autorun( (c) => {
        if (Game.ages[age].ageEnd(this)) { 
          this.stop()
          this.onAgeEnd(); 
          c.stop(); 
        }
      });
      if (callback) { callback() }
    })
  }
  removeAge() {
    this.ready.set(false)
    Game.ages[this.currentAge].buckets.forEach((bucket) => {
      this.emptyBucket(bucket.key)
    });
    log.clear()
    this._NeedsTick = []
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