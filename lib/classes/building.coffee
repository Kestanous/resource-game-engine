class @Building extends Module  
  @include Modules.value
  @include Modules.cost

  constructor: (config, @state) ->
    super
    {@name, @cost, @meta, @effect} = config ? {}
    throw new Meteor.Error('Building Init', 'no name given!') unless @name
    @effect ?= ->
    @tracker = Tracker.autorun (c) => 
      @_valueTracker.depend()
      Tracker.nonreactive => @effect() unless c.firstRun

  onBuy: -> @updateValue(1)

# Building.include Modules.value
# Building.include Modules.cost
