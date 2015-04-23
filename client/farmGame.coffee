class @FarmGame extends Game
  constructor: (savedGame) ->
    super
    
    for settings in ResourceList then @addResource(settings)
    for key, settings of ModifiersList then @addModifier(settings)

  tapForFood: ->
    @resources.food.update(1)

@GAME = new FarmGame()

