class Action extends BucketItem {
  constructor(config, state) {
    super()
    Mixins.cost(this)
    Mixins.modifier(this)
    this.state = state
    _.extend(this, config); 
    this.ready = new ReactiveVar(true);
    this.time = new ReactiveVar(0);
    state._NeedsTick.push(this);
  }
  name() {
    return this._name || this.key;
  }
  disabled() {
    if (this.disable) {
      return this.cannotBuy() || !this.ready.get() || this.disable(); 
    } else {
      return this.cannotBuy() || !this.ready.get(); 
    }
  }
  currentTime() {
    return this.time.get()
  }
  onBuy() {
    if (this.waitTime()) {
      this.ready.set(false)
    } else {
      this.effect()
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
        this.effect()
        this.ready.set(true)
      }
    }
  }
}

this.Action = Action