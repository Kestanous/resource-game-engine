class Resource extends BucketItem {
  constructor (config, state) {
    super()
    Mixins.value(this)
    Mixins.modifier(this)
    this.state = state
    let value = 0
    if (config.value) {
      value = config.value
      delete config.value
      this.setValue(value)
    } else {
      this.setModifier('hide', true)
      Tracker.afterFlush(() => {
        Tracker.autorun((c) => {
          this.getValue()
          if (!c.firstRun) {
            this.setModifier('hide', false)
            c.stop()
          }
        });
      });
    }
    _.extend(this, config);
    

    if (this.calculateMin) {
      this.setMinValue(this.calculateMin)
    }

    if (this.calculateMax) {
      this.setMaxValue(this.calculateMax)
    }
    this._tickValueTracker = new Tracker.Dependency()
    Tracker.afterFlush(() => {
      Tracker.autorun( c => {
        this._tickValueTracker.changed()
        this.tickValue = this.calculateTick()
      });
    });
  }
  tickValue: 0
  tick() {
    if (this.tickValue) this.updateValue(this.tickValue)
  }
  name() {
    return this._name || this.key;
  }
  calculateTick() {return 0}
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
  hide() { return this.getModifier('hide') }
}


this.Resource = Resource;