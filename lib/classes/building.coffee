class @Building extends Module
  @include Modules.valueModule
  @include Modules.costModule
  
  constructor: (config, @state) ->
    super
    unless config and config.name
      throw new Meteor.Error('Building Init', 'no name given!')

    @name = config.name
    @cost = config.cost
    @effect = config.effect or ->
    @meta = config.meta

  onBuy: -> @updateValue(1)