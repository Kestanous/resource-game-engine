class @Game extends Module
  @include Modules.unlock
  constructor: (savedGame) ->
    super
    @interval = 200 #tick length

    @resources = {}
    @modifiers = {}
    @buildings = {}
    @buildingsTrackers = {}

  pay: (cost) -> #nonreactive
    Tracker.nonreactive => #run only once, not reactively
      if @canPay(cost) 
        _.each cost, (value, key) => @buckets.resources[key].updateValue -value
        return true
      else
        false

  canPay: (cost) -> #reactive
    _.every cost, (value, key) => 
      @buckets.resources[key].getValue() >= value

  # addResource: (settings) -> #nonreactive
  #   resource = new Resource(settings, @)
  #   @resources[resource.name] = resource

  # addModifier: (settings) -> #nonreactive
  #   modifier = new Modifier(settings, @)
  #   @modifiers[modifier.name] = modifier

  # addBuilding: (settings) -> #nonreactive
  #   building = new Building(settings, @)
  #   @buildings[building.name] = building
  #   @buildingsTrackers[building.name] = Tracker.autorun (c) -> 
  #     building._valueTracker.depend()
  #     Tracker.nonreactive -> building.effect() unless c.firstRun
        

  start: () -> #nonreactive
    @stop() #clean up if needed
    @_intervalId = Meteor.setInterval (=> @onTick()), @interval

  onTick: -> #nonreactive, for game tick only
    for resource, obj of @buckets.resources then obj.runTick()

  stop: () -> Meteor.clearInterval(@_intervalId) if @_intervalId


  tapForFood: () -> @buckets.resources.food.updateValue(1)