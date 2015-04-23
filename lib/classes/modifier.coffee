class @Modifier
  constructor: (@state, current) -> 
    @count = new ReactiveVar(current or 0)

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