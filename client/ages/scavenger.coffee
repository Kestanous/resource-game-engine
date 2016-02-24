Template.scavenger.helpers
  resources: -> _.values(GAME.unlockedBuckets('resources'))
  actions: ->
    name: 'Actions'
    items: -> _.values(GAME.unlockedBuckets('actions'))
    template: 'action'
  technology: ->
    name: 'Technology'
    items: -> _.values(GAME.unlockedBuckets('technology')).filter (t) -> not t.owned()
    template: 'technology'

Template.scavenger.events 
  'mouseenter .hint': -> Session.set "hoverHint", {bucket: @bucket, key: @key}
