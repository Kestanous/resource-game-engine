# Game.addItem
#   name: 'field'
#   class: Building
#   bucket: 'buildings'
#   description:
#     cost: -> food: 10 + Math.pow(@getValue(), 2.44)
#     effect: -> @state.buckets.resources.food.setModifier 'fields', 0.125 * @getValue()  

# Game.addItem
#   name: 'house'
#   class: Building
#   bucket: 'buildings'
#   description:
#     cost: -> wood: 10 + Math.pow(@getValue(), 4)
#     effect: () -> @state.buckets.people.people.setModifier 'houses', @getValue() * 2    

# Game.addItem
#   name: 'aqueduct'
#   class: Building
#   bucket: 'buildings'
#   description:
#     cost: -> mineral: 50 + Math.pow(@getValue(), 2)
#     effect: () ->  @state.buckets.resources.food.setModifier 'aqueducts', @getValue() * 0.03

# Game.addItem 
#   name: 'pasture'
#   class: Building
#   bucket: 'buildings'
#   description:
#     cost: -> 
#       food: 50 + Math.pow(@getValue(), 2)
#       wood: 10 + Math.pow(@getValue(), 2)
#     effect: () ->  @state.buckets.resources.food.setModifier 'pasture', @getValue() * 0.5
