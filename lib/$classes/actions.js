class Action extends BucketItem {
  constructor(config, state) {
    super()
    Mixins.cost(this)
    this.state = state
    _.extend(this, config); 
    this.ready = new ReactiveVar(true);
    this.time = new ReactiveVar(0);
  }
  name() {
    return this._name || this.key;
  }
  disabled() {
    return this.cannotBuy() || !this.ready.get(); 
  }
  currentTime() {
    return this.time.get()
  }
  onBuy() {
    this.effect()
    if (this.waitTime()) {
      this.ready.set(false)
    }
  }
  waitTime() {
    return 0;
  }
  tick() {
    if (!this.ready.get()) {
      time = this.time.get() + this.state.interval
      if (time < this.waitTime()) {
        this.time.set(time)
      } else {
        this.time.set(0);
        this.ready.set(true)
      }
    }
  }
}

this.Action = Action