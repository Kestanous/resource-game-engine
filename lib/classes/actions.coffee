class @Actions extends Module  
  @include Modules.cost

  constructor: (config, @state) ->
    super
    {@name, @cost, @meta, @effect} = config ? {}
    throw new Meteor.Error('Actions Init', 'no name given') unless @name
    throw new Meteor.Error('Actions Init', 'no effect given') unless @effect
    throw new Meteor.Error('Actions Init', 'cost must be a function') unless _.isFunction @cost
    _.wrap @canBuy, (func) ->
      if true
        func()

  onBuy: -> @effect() 
