class @Game
  constructor: (savedGame) ->
    @interval = 200 #tick length

    @resources = {}
    @modifiers = {}

  pay: (cost) -> #nonreactive
    Tracker.nonreactive => #run only once, not reactively
      if @canPay(cost) 
        _.each cost, (value, key) => @resources[key].update -value
        return true
      else
        false

  canPay: (cost) -> #reactive
    _.every cost, (value, key) => 
      @resources[key].getValue() >= value

  addResource: (settings) -> #nonreactive
    resource = new Resource(settings, @)
    @resources[resource.name] = resource

  addModifier: (settings) -> #nonreactive
    modifier = new Modifier(settings, @)
    @modifiers[modifier.name] = modifier

  start: () -> #nonreactive
    @stop() #clean up if needed
    @_intervalId = Meteor.setInterval (=> @_update()), @interval

  _update: -> #nonreactive, for game tick only
    for resource, obj of @resources then obj.runTick()

  stop: () -> Meteor.clearInterval(@_intervalId) if @_intervalId

  getResources: ()-> _.values @resources
  
###

ok so here is the deal.

Game is the engine (game)

Game can have a resource added (resources)

Resources have a single value of any real number (value)

Resource values can increase or decrease by a set amount (updateValue)

Resource values can regularly increase or decrease by a amount (tick)

Resource ticks are the sum of all modifiers (modifier)

Game can have a modifier added (modifier)

Modifier names must be unique to to a Resource (key)

Modifiers can modify modifiers (subModifiers) 

Game can have a unlocks added (unlock)

Unlocks can apply modifiers [Action]


---- Under review
Games can have a trigger added (triggers)

Triggers can apply temporary modifiers [Action]
----
###
