class @Resource extends Module
  @include Modules.value
  @include Modules.modifier
  @include Modules.tick

  constructor: (config, @state) ->
    super
    {@name, @maxValue, @calculateTick, @onModifierChange, @meta} = config ? {}
    unless @name
      throw new Meteor.Error('Resource Init', 'no name given!')
    
    _.each(config.hide, (value, key) => @hide.set key, value ) if config.hide

    @hide = new ReactiveDict
    @tickValue = 0
    @calculateTick ?= ->
    @onModifierChange ?= ->

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