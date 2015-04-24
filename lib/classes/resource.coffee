class @Resource
  constructor: (settings, @state) ->
    settings ?= {}
    @_valueTracker = new Tracker.Dependency
    @_tickTracker = new Tracker.Dependency
    @_limitTracker = new Tracker.Dependency
    @_hide = new ReactiveVar settings.hide
    @_valuesToAdd = {}
    @_valuesToMultiply = {}
    @tickValue = 0
    @value = 0

    @name = settings.name
    if settings.defaultValueInc
      @setValuesToAdd('default', settings.defaultValueInc) 
    @limit = settings.defaultLimit
    @inTheRed = settings.inTheRed or -> #noop

  getValue: () ->
    @_valueTracker.depend()
    @value

  getTick: () ->
    @_tickTracker.depend()
    @tickValue

  getLimit: () ->
    @_limitTracker.depend()
    @limit

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
      @inTheRed()
    else if not @limit or temp <= @limit
      @value = temp
      @_valueTracker.changed()
    else
      @value = @limit
      @limitHit = true
      @_valueTracker.changed()

  runTick: ->
    @update @tickValue

    
  updateLimit: (value) ->
    @limit = value
    @_limitTracker.changed()

  setValuesToAdd: (name, value) ->
    @_valuesToAdd[name] = value
    @_updateTickValue()

  setValuesToMultiply: (name, value) ->
    @_valuesToMultiply[name] = value
    @_updateTickValue()

  _updateTickValue: -> 
    value = _.reduce @_valuesToAdd, ((mem, con) -> if con then mem + con else mem ), 0
    percent = _.reduce @_valuesToMultiply, ((mem, con) -> if con then mem + con else mem), 0
    if percent 
      @tickValue = value * percent 
    else 
      @tickValue = value
    @_tickTracker.changed()

  timeUntilValue: (value) -> 
    return Infinity if not value or value > @limit
    (value - @value) / (@tickValue / @state.interval)

  canSee: -> not @_hide.get()