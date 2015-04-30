@BuildingList = [
  name: 'field'
  cost: -> food: 10 + Math.pow(@getValue(), 2.44)
  effect: -> @state.resources.food.setModifier 'fields', 0.125 * @getValue()
,
  name: 'house'
  cost: -> wood: 10 + Math.pow(@getValue(), 4)
  effect: () -> @state.people.setModifier 'houses', @getValue() * 2
,
  name: 'aqueduct'
  cost: -> mineral: 50 + Math.pow(@getValue(), 2)
  effect: () ->  @state.resources.food.setModifier 'aqueducts', @getValue() * 0.03
,
  name: 'pasture'
  cost: -> 
    food: 50 + Math.pow(@getValue(), 2)
    wood: 10 + Math.pow(@getValue(), 2)
  effect: () ->  @state.resources.food.setModifier 'pasture', @getValue() * 0.5
]