Template.tribal.events 'mouseenter .hint': -> Session.set "hoverHint", {bucket: @bucket, key: @key}

Template.tribal.helpers
  resources: -> _.values(GAME.unlockedBuckets('resources'))
  ownedTech: -> 
    name: 'Technology Owned'
    height: 145
    items: _.values(GAME.unlockedBuckets('technology')).filter (t) -> t.owned()
  tabsData: ->
    tabs = []
    tabs.push
      name: 'Actions'
      items: -> _.values(GAME.unlockedBuckets('actions'))
      template: 'actions'
    if _.values(GAME.unlockedBuckets('technology')).filter( (t) -> not t.owned() ).length
      tabs.push
        name: 'Technology'
        items: -> _.values(GAME.unlockedBuckets('technology')).filter (t) -> not t.owned()
        template: 'technologies'
    if _.values(GAME.unlockedBuckets('tribes')).filter( (t) -> not t.isDestroyed() ).length
      tabs.push({
        name: 'Tribes'
        items: -> _.values(GAME.unlockedBuckets('tribes')).filter (t) -> not t.isDestroyed()
        template: 'tribalTab'
      })
    tabs
  assignment: ->
    name: 'People'
    items: _.values(GAME.unlockedBuckets('assignments', 'people').get()).filter (a) -> a.unlocked()
    template: 'assignment'    
    col: 12