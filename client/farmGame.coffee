class @FarmGame extends Game
  constructor: (savedGame) ->
    super
    for settings in ResourceList then @addResource settings
    for key, settings of BuildingList then @addBuilding settings
    @people = new People {}, @

  getBuildings: -> _.values @buildings

  tapForFood: -> @resources.food.updateValue(1)
  refineFoodToWood: -> @resources.wood.updateValue(1) if @pay food: 100
  cannotRefineFoodToWood: -> not @canPay food: 100

@GAME = new FarmGame()

