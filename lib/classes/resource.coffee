class @Resource extends Module
  @include Modules.valueModule
  @include Modules.modifierModule
  @include Modules.tickModule

  constructor: (config, @state) ->
    super
    unless config and config.name
      throw new Meteor.Error('Resource Init', 'no name given!')
    @hide = new ReactiveDict
    @tickValue = 0

    @name = config.name
    @maxValue = config.maxValue

    if _.isFunction config.calculateTick 
      @calculateTick = config.calculateTick 
    else 
      @calculateTick = -> @getModifiers('default')

    @setModifier('default', config.tick or 0)
    @onModifierChange = config.onModifierChange or ->

    _.each(config.hide, (value, key) => @hide.set key, value ) if config.hide
    @meta = config.meta

    Tracker.autorun (c) =>
      @_modifierTracker.depend()
      value = @calculateTick()
      if value
        @tickValue = value
      else 
        @tickValue = 0

      unless c.firstRun
        @_tickTracker.changed()
        Tracker.nonreactive =>
          @onModifierChange()

  overMaxValue: (excess) -> 
    @setValue(@maxValue)
  underMinValue: ->
    @setValue(0)


