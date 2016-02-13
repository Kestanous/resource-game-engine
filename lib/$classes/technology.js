class Technology {
  constructor(config, state) {
    Mixins.cost(this)
    this.state = state
    _.extend(this, config); 
    this.bought = new ReactiveVar(false);
  }
  name() {
    return this._name || this.key;
  }
  disabled() {
    return this.bought.get(); 
  }
  onBuy() {
    if (this.effect) this.effect()
    this.bought.set(true); 
  }
}

this.Technology = Technology