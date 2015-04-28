class @FarmGame extends Game
  constructor: (savedGame) ->
    super
    for settings in ResourceList then @addResource(settings)
    for key, settings of BuildingList then @addBuilding(settings)

  # getBuildings:-> @getModifiers (modifier) -> modifier.meta.building = true
  getBuildings: -> _.values @buildings

  tapForFood: -> @resources.food.update(1)
  refineFoodToWood: -> @resources.wood.update(1) if @pay food: 100
  cannotRefineFoodToWood: -> not @canPay food: 100

@GAME = new FarmGame()

