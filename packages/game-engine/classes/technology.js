import {cost} from '../mixins/cost.js'
import {BucketItem} from './bucketItem.js'
class Technology extends BucketItem {
  constructor(config, state, load, advance) {
    super()
    cost(this)
    this.state = state
    _.extend(this, config); 
    this._owned = new ReactiveVar(!advance && load);
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
  save() {
    return this.owned(); 
  }
}

export {Technology};