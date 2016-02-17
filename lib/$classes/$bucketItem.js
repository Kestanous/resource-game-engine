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
}
this.BucketItem = BucketItem;