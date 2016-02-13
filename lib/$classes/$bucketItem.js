class BucketItem {
  getHint() {
    let out = { description: this.description() }

    if (this.cost) {
      let costString = '', cost = this.cost();
      for (let key in cost) { costString += `${key}: ${cost[key]}` };
      out.cost = costString;
    }

    return out
  }
}
this.BucketItem = BucketItem;