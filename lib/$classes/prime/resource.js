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

    if (!advance) {
      for (let modifier in loadData.modifiers) {
        this.setModifier(modifier, loadData.modifiers[modifier])
      }
    }

    if (value) {
      this.setValue(value)
    } else {
      this.setModifier('hide', true)
      Tracker.afterFlush(() => {
        this.autorun((c) => {
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
      this.autorun( c => {
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
    return { 
      value: this.getValue(),
      modifiers: this.getAllModifier()
    }
  }
}


this.Resource = Resource;