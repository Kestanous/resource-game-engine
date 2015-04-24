class @Modifier
  constructor: (settings, @state) -> 

    unless settings and settings.name
      throw new Meteor.Erorr('Modifier Init', 'no name given!')

    # @_countTracker = new Tracker.Dependency
    @hide = new ReactiveDict

    # @count = 0
    @name = settings.name
    @meta = settings.meta

    _.each(settings.hide, (value, key) => @hide.set key, value ) if settings.hide

  buy: -> @count.set(@count.get()+1) if @state.pay(@currentCost())

  numberOwned: -> @count.get()

  canBuy: -> @state.canPay @currentCost()
  canSee: -> true
  
  #farm specific
  currentCost: ->
    cost = food: 0
    count = @count.get()
    if count is 0
      cost.food = 10
    else
      cost.food = count * 100
    return cost
  updateTickValue: -> @count.get() * 0.6
  buy: ->
    super
    @state.resources.food.setValuesToAdd('farmTick', @updateTickValue())