@tickModule = 
  constructor: ->
    @_tickTracker = new Tracker.Dependency
  getTick: () ->
    @_tickTracker.depend()
    @tickValue

  runTick: -> @updateValue @tickValue

  timeUntilValue: (value, interval) -> 
    return Infinity if not value or value > @maxValue
    (value - @value) / (@tickValue / interval)