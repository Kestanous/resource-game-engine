Template.scavenger.helpers
  resources: -> _.values(GAME.unlockedBuckets('resources'))
  ownedTech: -> 
    name: 'Technology Owned'
    height: 441
    items: _.values(GAME.unlockedBuckets('technology')).filter (t) -> t.owned()
  actions: ->
    name: 'actions'
    items: _.values(GAME.unlockedBuckets('actions'))
    template: 'action'
  technology: ->
    name: 'technology'
    items: _.values(GAME.unlockedBuckets('technology')).filter (t) -> not t.owned()
    template: 'technology'

Template.scavenger.events 
  'mouseenter .hint': -> Session.set "hoverHint", {bucket: @bucket, key: @key}
