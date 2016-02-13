class Game {
  constructor(savedGame) {
    Mixins.buckets(this)
    this.interval = 0.2;
    this.ready = new ReactiveVar(false)
  }
  start() {
    this.stop(); //clean up if needed
    this._intervalId = Meteor.setInterval(() => {this.onTick()}, this.interval * 1000 );
  }
  onTick() { 
    resources = this.buckets('resources');
    for (resource in resources) { resources[resource].tick(); }
    actions = this.buckets('actions');
    for (action in actions) { actions[action].tick(); }
  }
  stop () { 
    Meteor.clearInterval(this._intervalId)
  }
  loadAge(age) {
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
    Tracker.afterFlush(() => {this.ready.set(true)})
  }
  canPay(cost) { return _.every(cost, (value, key) => this.buckets('resources',key).getValue() >= value )}
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