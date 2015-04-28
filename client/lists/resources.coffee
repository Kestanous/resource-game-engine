@ResourceList = [ #array of objects
  name: 'people'
  hide: 
    limit: true
    tick: true
  , #new object
    name: 'food'
    limit: 5000
    calculateTick: -> @modifiers.get('fields') 
    inTheRed: (amount) -> console.log "in the red by #{amount}"
  ,
    name: 'wood'
    limit: 100
]