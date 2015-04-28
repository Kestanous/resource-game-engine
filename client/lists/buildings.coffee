@BuildingList = [
  name: 'field'
  cost: ->
    food: 10 + Math.pow(@getCount(), 2.44)
  effect: ->
    console.log 0.125 * @getCount()
    @state.resources.food.setModifier('fields', 0.125 * @getCount())
  ,
    name: 'house'
    cost: ->
      wood: 50 + Math.pow(@getCount(), 4)
    effect: () -> @state.resources.people.update(2)
]