//effectively a dictionary
const buckets = FunctionalMixin({
  addItem (key, bucket, clazz, description = {}, prerequisites) {
    if (!_.isString(key)) {throw new Meteor.Error('Bucket addItem', 'No key given')};
    if (!_.isString(bucket)) {throw new Meteor.Error('Bucket addItem', 'No bucket given')};
    if (!_.isFunction(clazz)) {throw new Meteor.Error('Bucket addItem', 'No class given')};
    if (prerequisites && !_.isFunction(prerequisites)) {
      throw new Meteor.Error('Bucket addItem', 'Prerequisites must be a function')
    };
    Tracker.afterFlush(() => {
      this.bucketTrackers(bucket)[key] = Tracker.autorun(c => {
        if (!prerequisites || prerequisites.apply(this) ){
          this.bucketDeps(bucket).changed()
          this.buckets(bucket)[key] = new clazz(Object.assign({ key, bucket }, description), this);
          c.stop() 
        }
      });
    });
  },
  removeItem(bucket, key) {
    if (!_.isString(bucket)) { throw new Meteor.Error('Bucket removeItem', 'No bucket given') };
    if (!_.isString(bucket)) { throw new Meteor.Error('Bucket removeItem', 'No key given') };
    if (this._buckets && this._buckets[bucket]) {delete this._buckets[bucket][key]}
    if (this._bucketTrackers && this._bucketTrackers[bucket] && delete this._bucketTrackers[bucket][key]) {
      this._bucketTrackers[bucket][key].stop()
      delete this._bucketTrackers[bucket][key]
    }
  },
  emptyBucket(bucket) { 
    for (let tracker in this.bucketTrackers(bucket)) {this.bucketTrackers(bucket)[tracker].stop()}
    delete this._buckets[bucket]; 
    delete this._bucketTrackers[bucket]; 
  },
  buckets (bucket, key) { 
    _buckets = this._buckets || (this._buckets = {}); 
    if (!bucket && !key) { return _buckets; }
    this.bucketDeps(bucket).depend()
    bucket = _buckets[bucket] || (_buckets[bucket] = {});
    if (!key) { return bucket }
    return bucket[key];
  },
  bucketTrackers (bucket) { 
    _bucketTrackers = this._bucketTrackers || (this._bucketTrackers = {}); 
    if (!bucket) { return _bucketTrackers; }
    return _bucketTrackers[bucket] || (_bucketTrackers[bucket] = {});
  },
  bucketDeps (bucket) { 
    _bucketDeps = this._bucketDeps || (this._bucketDeps = {}); 
    if (!bucket) { return _bucketDeps; }
    return _bucketDeps[bucket] || (_bucketDeps[bucket] = new Tracker.Dependency());
  }
});

Mixins.buckets = buckets