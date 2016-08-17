class BucketItem {
  getHint() {
    let out = { description: this.description() }

    if (this.cost) {
      let costString = '', cost = this.cost(), key;
      for (key in cost) { costString += `${key}: ${cost[key]}` };
      out.cost = costString;
    }

    return out
  }
  name() {
    return this._name || this.key
  }
  save() {} //noop
  stopTrackingValue() {
    if (this._TrackingValue) {
      this._TrackingValue.forEach( (t) => { t.stop() } );
    }
  }
  autorun(func) {
    if (!this._TrackingValue) { this._TrackingValue = [] }
    let tracker = Tracker.autorun(func);
    this._TrackingValue.push(tracker);
    return tracker;
  }
}
export {BucketItem};