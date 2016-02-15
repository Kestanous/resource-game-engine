class Game {
  constructor(savedGame) {
    Mixins.buckets(this)
    this.interval = 0.2;
    this.ready = new ReactiveVar(false)
    this.running = new ReactiveVar(false)
  }
  play() {
    if (!this.ready.get()) return 
    this.pause(); //clean up if needed
    this._intervalId = Meteor.setInterval(() => {this.onTick()}, this.interval * 1000 );
    this.running.set(true)
  }
  onTick() { 
    resources = this.buckets('resources');
    for (resource in resources) { resources[resource].tick(); }
    actions = this.buckets('actions');
    for (action in actions) { actions[action].tick(); }
  }
  pause() { 
    Meteor.clearInterval(this._intervalId)
    this.running.set(false)
  }
  onGameOver() { }
  onAgeEnd() { }
  loadAge(age, callback) {
    this.removeAge()
    age = Game.ages[age]
    for (let resource in age.resources) {
      this.addItem(resource, 'resources', Resource, age.resources[resource].description);
    }
    for (let action in age.actions) {
      this.addItem(action, 'actions', Action, age.actions[action].description, age.actions[action].prerequisites);
    }
    for (let technology in age.technology) {
      this.addItem(technology, 'technology', Technology, age.technology[technology].description, age.technology[technology].prerequisites);
    }
    Tracker.afterFlush(() => {
      this.ready.set(true)
      Tracker.autorun( (c) => {
        if (age.ageEnd(this)) { this.onAgeEnd(); c.stop(); }
      });
      callback()
    })
  }
  removeAge() {
    this.ready.set(false)
    this.emptyBucket('resources')
    this.emptyBucket('actions')
    this.emptyBucket('technology')
  }
  canPay(cost) { return _.every(cost, (value, key) => this.buckets('resources',key).getValue() >= value ) }
  pay(cost) {
    if (this.canPay(cost)) {
      Tracker.nonreactive( () => {
        _.each(cost, (value, key) => this.buckets('resources',key).updateValue(-value) )
      });
      return true
    } else return false
  }
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