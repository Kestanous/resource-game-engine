@ResourceList = [ #array of objects
  name: 'food'
  maxValue: 5000
  calculateTick: -> 
    ((@getModifier('fields') or 0) * (1 + (@getModifier('fields') or 0))) + (@getModifier('people') or 0) + (@getModifier('farmers') or 0)
  inTheRed: (amount) -> console.log "in the red by #{amount}"
,
  name: 'wood'
  maxValue: 100
  calculateTick: -> @getModifier('woodcutters')
,
  name: 'science'
  maxValue: 500
  calculateTick: -> @getModifier('scientists')
,
  name: 'mineral'
  maxValue: 200
  calculateTick: -> @getModifier('miners')  
]