const value = FunctionalMixin({
  _values() { return this._valuesDict || (this._valuesDict = new ReactiveDict) },
  getMinValue() {return this._values().get('min') || 0;},
  setMinValue(func) {
    if (this._minValueTracker) this._minValueTracker.stop()
    Tracker.afterFlush(() => {
      this._minValueTracker = Tracker.autorun( c => {
        this._values().set('min', func.apply(this));
      })
    });
  },
  getMaxValue() {return this._values().get('max') || Infinity;},
  setMaxValue(func) {
    if (this._maxValueTracker) this._maxValueTracker.stop()
    Tracker.afterFlush(() => {
      this._maxValueTracker = Tracker.autorun( c => {
        this._values().set('max', func.apply(this));
      })
    });
  },  
  getValue() {return this._values().get('value') || 0;},
  setValue(value) {
    return this._values().set('value', value)
  },
  updateValue(value) {
    temp = this.getValue() + value;
    let out = 0;
    Tracker.nonreactive( () => {
      if (temp < this.getMinValue()) {
        this.underMinValue(temp)
        out = temp - this.getMinValue()
      }else if (temp > this.getMaxValue()) {
        this.overMaxValue(temp)
        out = temp - this.getMaxValue()
      } else this.setValue(temp)
    });
    return out;
  },
  overMaxValue() {
    return this.setValue(this.getMaxValue());
  },
  underMinValue() {
    return this.setValue(this.getMinValue());
  },
  atLimit() { return this.getMaxValue() === this.getValue() },
  stopTracking() {
    if (this._minValueTracker) this._minValueTracker.stop()
    if (this._maxValueTracker) this._maxValueTracker.stop()
  }
});
Mixins.value = value