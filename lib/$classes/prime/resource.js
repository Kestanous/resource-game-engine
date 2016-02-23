class Resource extends BucketItem {
  constructor (config, state, loadData = {}, advance) {
    super()
    Mixins.value(this)
    Mixins.modifier(this)
    this.state = state
    let value;
    value = config.value
    delete config.value

    if (config.advance && advance) {
      value = loadData.value
    } else if (loadData.value && !advance) {
      value = loadData.value
    } 


    if (value) {
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
    state._NeedsTick.push(this);
  }
  tickValue: 0
  tick() {
    if (this.tickValue && (! this.atLimit() || this.tickValue < 0)) this.updateValue(this.tickValue)
  }
  name() {
    return this._name || this.key;
  }
  calculateTick() {return 0}
  getTickValue() {
    this._tickValueTracker.depend();
    return this.tickValue;
  }
  hide() { return this.getModifier('hide') }
  save() {
    return { value: this.getValue() }
  }
}


this.Resource = Resource;