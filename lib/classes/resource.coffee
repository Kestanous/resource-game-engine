class @Resource
  constructor: (config, @state) ->
    unless config and config.name
      throw new Meteor.Error('Resource Init', 'no name given!')

    @_valueTracker = new Tracker.Dependency
    @_tickTracker = new Tracker.Dependency
    @_limitTracker = new Tracker.Dependency
    @hide = new ReactiveDict
    @modifiers = new ReactiveDict
    @_valuesToAdd = {}
    @_valuesToMultiply = {}
    @tickValue = 0
    @value = 0

    @name = config.name
    @limit = config.limit
    @inTheRed = config.inTheRed or -> #noop

    if _.isFunction config.calculateTick 
      @calculateTick = config.calculateTick 
    else 
      @calculateTick = -> @modifiers.get('default')

    @setModifier('default', config.tick or 0)

    _.each(config.hide, (value, key) => @hide.set key, value ) if config.hide
    @meta = config.meta
    

  getValue: () ->
    @_valueTracker.depend()
    @value

  getTick: () ->
    @_tickTracker.depend()
    @tickValue

  getLimit: () ->
    @_limitTracker.depend()
    @limit

  atLimit: () ->  @getLimit() is @getValue()

  update: (value) -> 
    if value < 0
      @limitHit = false if @limitHit
      @_update(value)
    else if @limitHit #already at max
      return #don't trigger reactivity, no change
    else
      @_update(value)

  _update: (value) ->
    temp = @value + value
    if temp < 0
      @value = 0
      @_valueTracker.changed()
      @inTheRed(temp)
    else if not @limit or temp <= @limit
      @value = temp
      @_valueTracker.changed()
    else
      @value = @limit
      @limitHit = true
      @_valueTracker.changed()

  runTick: -> @update @getTickForRun()

  getTickForRun: -> @tickValue
    
  updateLimit: (value) ->
    @limit = value
    @_limitTracker.changed()

  setModifier: (key, value) ->
    @modifiers.set(key, value)
    @tickValue = @calculateTick()

  timeUntilValue: (value) -> 
    return Infinity if not value or value > @limit
    (value - @value) / (@tickValue / @state.interval)
