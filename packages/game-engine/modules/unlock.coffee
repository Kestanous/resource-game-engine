Modules.unlock = 
  constructor: -> #custom mixin singleton
    Tracker.nonreactive =>
      @buckets = {}
      @unlocksTracker = {}
      @constructor._unlocks.forEach (unlock) =>
        @buckets[unlock.bucket] ?= {}
        @buckets[unlock.bucket][unlock.name] = new unlock.class(unlock.description, @)
        @buckets[unlock.bucket][unlock.name].unlocked = new ReactiveVar(false)

      #loop a second time for the prerequisites 
      #otherwise they we get chicken without eggs
      @constructor._unlocks.forEach (unlock) =>
        @unlocksTracker["#{unlock.name}.#{unlock.name}"] = Tracker.autorun (c) => 
          if not unlock.prerequisites or unlock.prerequisites.call(@, @buckets[unlock.bucket][unlock.name])
            @buckets[unlock.bucket][unlock.name].unlocked.set(true)
            c.stop()

  getItems: (bucket) -> 
    if @buckets[bucket]
      _.filter _.values(@buckets[bucket]), (i) -> i.unlocked.get()
  class:
    _unlocks: []
    addItem: (unlock) ->
      unless _.isString unlock.name
        throw new Meteor.Error('Unlock', 'No name give in unlock description')

      unless _.isString unlock.bucket
        throw new Meteor.Error("Unlock '#{unlock.name}'", 'No bucket name given in unlock description')    

      unless _.isFunction unlock.class
        throw new Meteor.Error("Unlock '#{unlock.name}'", 'No class target give in unlock description')    

      #insure a description is passed to the class with a name
      unlock.description ?= {}
      unlock.description.name ?= unlock.name
      
      @_unlocks.push(unlock) #returns number of unlocks
