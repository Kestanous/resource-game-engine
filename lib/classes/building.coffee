class @Building
  constructor: (config, @state) ->
    unless config and config.name
      throw new Meteor.Error('Building Init', 'no name given!')
    
    @_countTracker = new Tracker.Dependency

    @name = config.name
    @cost = config.cost
    @effect = config.effect or ->
    @count = 0
    @meta = config.meta

  getCost: -> if _.isFunction @cost then @cost() else @cost
  getCount: ->
    @_countTracker.depend()
    @count

  canBuy: -> @state.canPay(@getCost())
  cannotBuy: -> not @canBuy()

  buy: -> 
    if @state.pay(@getCost()) 
      ++@count
      @_countTracker.changed() 