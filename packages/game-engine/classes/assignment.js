import {BucketItem} from './bucketItem.js'
class Assignment extends BucketItem {
  constructor (config, state) {
    super()
    this.state = state
    this._assignment = new ReactiveDict
    this.max = 0
    this._items = {}
    this._itemsTrackers = {}
    let initCost = 0

    for (let task in config.tasks) {
      if (config.tasks[task].default) {
        this.default = task
      } else {
        initCost += config.tasks[task].value || 0
        this._assignment.set(task, config.tasks[task].value || 0)
      }
      this._items[task] = new AssignmentItem({
        key: config.key + '.' + task,
        bucket: config.bucket,
        _name: config.tasks[task].name || task,
        default: this.default == task,
        effect: config.tasks[task].effect,
        description: config.tasks[task].description
      }, this);
      this.autorun((c) => {
        if (!config.tasks[task].prerequisites || config.tasks[task].prerequisites.apply(this)) {
          c.stop()
          this._items[task]._unlocked.set(true)
        }
      });
      this.autorun((c) => {
        if (this.state.ready.get() && this._items[task]._unlocked.get() && this._items[task].effect) {
          this._items[task].effect()
        }
      });
    } 
    // insure all non default tasks pay their init cost (if any)
    this._assignment.set( this.default, ( this._assignment.get(this.default) || 0 ) - initCost )

    this.autorun(() => {
      if (!this.state.ready.get()) { return }
      let oldMax, avalible, delta, used;
      Tracker.nonreactive(() => {
        oldMax = this.max;
        avalible =  this._assignment.get(this.default) || 0;
      })
      this.max = parseInt(config.bound(state))
      delta = this.max - oldMax
      if (delta > 0) {
        this._assignment.set(this.default, avalible + delta)
      } else {
        if (avalible + delta > 0) {
          this._assignment.set(this.default, avalible + delta)
        } else {
          this._panic(avalible + delta)
        }
      }
    })
  }
  add(task, value) {
    if (task == this.default) {
      throw new Meteor.Error('add', `${task} can not be added to`)
    }
    let avalible = this._assignment.get(this.default)
    , oldValue = this._assignment.get(task)
    if (avalible >= value) {
      this._assignment.set(this.default, avalible - value)
      this._assignment.set(task, oldValue + value)
    } else {
      this._assignment.set(this.default, 0)
      this._assignment.set(task, oldValue + avalible)
    }
  }
  remove(task, value) {
    if (task == this.default) {
      throw new Meteor.Error('remove', `${task} can not be removed from`)
    }
    let used = this._assignment.get(task)
    , avalible = this._assignment.get(this.default);
    if (used >= value) {
      this._assignment.set(task, used - value)
      this._assignment.set(this.default, avalible + value)
    } else {
      this._assignment.set(task, 0)
      this._assignment.set(this.default, avalible + used)
    }
  }
  get(task) {
    if (task) { return this._items[task] }
    else { return this._items }
  }
  _panic(overDraft) {
    let tasks = {}, _tasks = this._assignment.all();
    for (let task in _tasks) {
      if (_tasks[task] && this.default != task) { 
        tasks[task] = _tasks[task] 
      }
    }
    while (overDraft < 0) {  
      for (let task in tasks) {
        if (tasks[task] && overDraft++ < 0) { 
          tasks[task]--
        }
      }
    }
    for (task in tasks) { this._assignment.set(task, tasks[task])  }
    this._assignment.set(this.default, 0) 
  }
  reset() {
    for (task in this._items) {
      task = this._items[task]
      if (!task.default) { task.remove(task.getValue()) }
    }
  }
}

class AssignmentItem extends BucketItem {
  constructor(config, parent) {
    super();
    _.extend(this, config);
    this.parent = parent;
    this._unlocked = ReactiveVar(false)
  }
  getValue() {
    return this.parent._assignment.get(this._name)
  }
  unlocked() {
    return this._unlocked.get()
  }
  add(value) {
    this.parent.add(this._name, value);
  }
  remove(value) {
    this.parent.remove(this._name, value);
  }
  canRemove(n = 1) {
    return this.parent._assignment.get(this._name) >= n;
  }
  canAdd(n = 1) {
    if (!this.default){
      return this.parent._assignment.get(this.parent.default) >= n;
    } else {
      return this.parent.max - this.parent._assignment.get(this.parent.default) < n;
    }
  }
}

export {Assignment};