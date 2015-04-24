@ResourceList = [ #array of objects
  name: 'people'
  hide: 
    limit: true
    tick: true
  , #new object
    name: 'food'
    limit: 5000
    tick: 1
    inTheRed: -> 
      console.log 'red'
  ,
    name: 'wood'
    limit: 100
]