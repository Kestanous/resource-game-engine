Template.game.onCreated -> GAME.start()

Template.game.onDestroyed -> GAME.stop()  

Template.game.helpers
  game: -> GAME

Template.game.events
  'click .tap': -> GAME.tapForFood()
  'click .refineFood': -> GAME.refineFoodToWood()

Template.buildings.helpers
  canSee: -> GAME.buildings.farms.canSee()
  disabled: -> 'disabled' unless GAME.buildings.farms.canBuy()
  numberOwned: -> GAME.buildings.farms.numberOwned()

Template.buildings.events
  'click .addFarm': -> GAME.buildings.farms.buy()

Template.registerHelper 'formatNumber', (value) -> 
  return unless _.isNumber value
  value = formatNumber value
  if value.suffix
    return value.number.toFixed(2) + value.suffix
  else
    Math.floor(value.number) #if less then a thousand only give whole numbers
  

Template.registerHelper 'formatTick', (value) -> 
  return unless _.isNumber value
  result = formatNumber value
  value = result.number.toFixed(2)
  value = '+' + value if value > 0
  value = value + result.suffix if result.suffix
  value

Template.registerHelper 'formatLimit', (value) -> 
  return unless _.isNumber value
  value = formatNumber value
  value.number = parseFloat value.number.toFixed(2) #strip trailing 0s
  value.number = value.number + value.suffix if value.suffix
  value.number

ranges = [
  { divider: 1e18 , suffix: 'G' },
  { divider: 1e15 , suffix: 'Q' },
  { divider: 1e12 , suffix: 'T' },
  { divider: 1e9 , suffix: 'B' },
  { divider: 1e6 , suffix: 'M' },
  { divider: 1e3 , suffix: 'K' }
]

formatNumber = (num) -> 
  formatedNumber = {number: num}
  for range in ranges
    if num >= range.divider
      formatedNumber.number = (num / range.divider.toString()) 
      formatedNumber.suffix = range.suffix
  return formatedNumber


