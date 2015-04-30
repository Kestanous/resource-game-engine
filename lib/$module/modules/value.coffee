@valueModule =
  constructor: ->
    @_valueTracker = new Tracker.Dependency
    @_minValueTracker = new Tracker.Dependency
    @_maxValueTracker = new Tracker.Dependency
  value: 0
  minValue: null
  maxValue: null
  
  getValue: () ->
    @_valueTracker.depend()
    @value

  setValue: (value) ->
    @_valueTracker.changed()
    @value = value

  getMinValue: () ->
    @_minValueTracker.depend()
    @minValue

  setMinValue: (min) ->
    @_minValueTracker.changed()
    @minValue = min

  getMaxValue: () ->
    @_maxValueTracker.depend()
    @maxValue

  setMaxValue: (max) ->
    @_maxValueTracker.changed()
    @maxValue = max

  updateValue: (value) -> 
    temp = @value + value
    Tracker.nonreactive =>
      return @underMinValue(temp) if _.isNumber(@minValue) and temp < @minValue
      return @overMaxValue(temp) if _.isNumber(@maxValue) and temp > @maxValue
      @setValue(temp)

  overMaxValue: -> #noop if value > @max
  underMinValue: -> #noop if value < @min
  atLimit: () ->  @getMaxValue() is @getValue()