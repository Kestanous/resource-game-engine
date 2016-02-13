class Resource {
  constructor (config, state) {
    Mixins.value(this)
    Mixins.modifier(this)
    this.state = state
    let value = 0
    if (config.value) {
      value = config.value
      delete config.value
    }
    _.extend(this, config); 
    this.setValue(value)

    if (this.calculateMin) {
      this.setMinValue(this.calculateMin)
    }

    if (this.calculateMax) {
      this.setMaxValue(this.calculateMax)
    }
    this._tickValueTracker = new Tracker.Dependency()
    Tracker.autorun( c => {
      this._tickValueTracker.changed()
      this.tickValue = this.calculateTick()
    });
  }
  tickValue: 0
  tick() {
    this.updateValue(this.tickValue)
  }
  name() {
    return this._name || this.key;
  }
  calculateTick() {return 0}
  onModifierChange() {}
  overMaxValue(excess) { 
    return this.setValue(this.maxValue());
  }
  underMinValue() {
    return this.setValue(this.minValue());
  }
  getTickValue() {
    this._tickValueTracker.depend();
    return this.tickValue;
  }
}


this.Resource = Resource;