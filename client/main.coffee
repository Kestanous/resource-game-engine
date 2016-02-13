@GAME = new Game()

Template.log.helpers
  log: -> log.find({}, {limit: 15, sort: {time: -1}}).fetch()

Template.game.onRendered => 
  GAME.loadAge('scavenger')
  @GAME.start()
Template.game.onDestroyed => @GAME.stop()  

Template.game.helpers
  game: => @GAME

Template.game.events
  'mouseenter .hint': -> Session.set "hoverHint", {bucket: @bucket, key: @key}

Template.hoverHint.helpers
  bucket: -> 
    {bucket} = Session.get('hoverHint')
    bucket
  key: -> 
    {key} = Session.get('hoverHint')
    key
  hint: ->
    hoverHint = Session.get('hoverHint')
    return unless hoverHint?.bucket && hoverHint.key
    bucket = GAME.buckets(hoverHint.bucket, hoverHint.key)
    return unless bucket
    bucket.getHint()

Template.action.helpers
  toFixed: (value) -> return value.toFixed(0)

Template.action.events
  'click button': -> @buy()

Template.technology.helpers
  disabled: () -> 
    if @disabled() then true else not @canBuy()
  color: () ->
    if @disabled() then 'success' else 'primary'

Template.technology.events
  'click button': -> @buy()

Template.registerHelper 'getBucket', (bucket) -> 
  obj = GAME.buckets(bucket)
  _.values(obj) if obj

Template.registerHelper 'formatNumber', (value) ->
  return if not isFinite(value)
  value = formatNumber value
  if value.suffix
    return value.number.toFixed(2) + value.suffix
  else
    Math.floor(value.number) #if less then a thousand only give whole numbers
  

Template.registerHelper 'formatTick', (value) -> 
  return unless value
  result = formatNumber(value / GAME.interval )
  value = result.number.toFixed(2) 
  value = '+' + value if value > 0
  value = value + result.suffix if result.suffix
  value

Template.registerHelper 'formatLimit', (value) -> 
  return unless value
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
