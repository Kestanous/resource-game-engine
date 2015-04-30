@costModule =
  getCost: -> if _.isFunction @cost then @cost() else @cost

  canBuy: -> @state.canPay(@getCost())
  cannotBuy: -> not @canBuy()

  buy: -> @onBuy() if @state.pay(@getCost())
  onBuy:  ->
    