class Technology extends BucketItem {
  constructor(config, state) {
    super()
    Mixins.cost(this)
    this.state = state
    _.extend(this, config); 
    this._owned = new ReactiveVar(false);
  }
  name() {
    return this._name || this.key;
  }
  owned() {
    return this._owned.get(); 
  }
  onBuy() {
    if (this.effect) this.effect()
    this._owned.set(true); 
  }
}

this.Technology = Technology