@GAME = new Game
Template.game.onCreated -> 
  @game = GAME

Template.game.onRendered -> @game.start()

Template.game.onDestroyed -> @game.stop()  

Template.game.helpers
  game: -> Template.instance().game
  getBuildings: -> Template.instance().game.getItems 'buildings'
  getResources: -> Template.instance().game.getItems 'resources'

Template.game.events
  'click #tap': -> Template.instance().game.tapForFood()
  'click .refineFood': -> Template.instance().game.refineFoodToWood()

Template.buildings.events
  'click .buy': -> @buy()

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
  value = result.number.toFixed(2) * 5
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

Template.people.helpers
  job: ->
    if @people
      _.map @people.assignmentSlots.get(), (job) =>
        name: job, value: @people.getAssignment(job), handle: @people
    else []

Template.people.events
  'click .plus': () -> @handle.setAssignment(@name, 1)
  'click .minus': () -> @handle.setAssignment(@name, -1)

