Game.addItem
  name: 'food'
  class: Resource
  bucket: 'resources'
  # prerequisites: -> 
  description:
    maxValue: 5000
    calculateTick: -> 
      tick = @getModifier('fields') * (1 + @getModifier('fields'))
      tick += @getModifier('people') + @getModifier('pasture')
      tick += @getModifier('farmers')
      tick

Game.addItem
  name: 'wood'
  class: Resource
  bucket: 'resources'
  prerequisites: () -> 
    @buckets.resources.wood.getValue() > 0
  description:
    maxValue: 100
    calculateTick: -> @getModifier('woodcutters')

Game.addItem
  name: 'science'
  class: Resource
  bucket: 'resources'
  # prerequisites: ->
  description:
    maxValue: 500
    calculateTick: -> @getModifier('scientists')

Game.addItem
  name: 'mineral'
  class: Resource
  bucket: 'resources'
  # prerequisites: -> 
  description:
    maxValue: 200
    calculateTick: -> @getModifier('miners')  
