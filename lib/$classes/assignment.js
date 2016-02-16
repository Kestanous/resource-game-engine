class Assignment extends BucketItem {
  constructor (config, state) {
    super()
    this._assignment = new ReactiveDict
    this.max = 0
    for (let task in config.tasks) {
      if (task != 'key') {
        if (config.tasks[task].default) {
          this.default = task
        } else {
          this._assignment.set(task, config.tasks[task].value || 0)
        }
      } 
    } 
    this.tracker = Tracker.autorun(() => {
      let oldMax, avalible, delta, used;
      Tracker.nonreactive(() => {
        oldMax = this.max;
        avalible = this._assignment.get(this.default) || 0;
      })
      this.max = config.tasks.key(state)
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
    if (avalible >= value) {
      this._assignment.set(this.default, avalible - value)
      this._assignment.set(task, value)
    } else {
      this._assignment.set(this.default, 0)
      this._assignment.set(task, avalible)
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
    this._assignment.get(task)
  }
  getAll() {
    this._assignment.all()
  }
  _panic(overDraft) {
    let need = {}, tasks = this._assignment.all(), task;
    while (overDraft < 0) {   
      for (task in tasks) {
        if (overDraft++ < 0) { 
          if (!need[task]) { need[task] = 0 }
          need[task]++
        }
      }
    }
    for (task in need) { this._assignment.set(task, need[task])  }
    this._assignment.set(this.default, 0) 
  }
}
this.Assignment = Assignment