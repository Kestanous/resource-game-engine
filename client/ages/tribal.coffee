Template.tribal.events 'mouseenter .hint': -> Session.set "hoverHint", {bucket: @bucket, key: @key}

Template.tribal.helpers
  resources: -> _.values(GAME.unlockedBuckets('resources'))
  ownedTech: -> 
    name: 'Technology Owned'
    height: 145
    items: -> _.values(GAME.unlockedBuckets('technology')).filter (t) -> t.owned()
  tabsData: ->
    tabs = []
    tabs.push({
      name: 'Tribes'
      template: 'tribalTab'
    })
    if _.values(GAME.unlockedBuckets('technology')).filter( (t) -> not t.owned() ).length
      tabs.push
        name: 'Technology'
        items: -> _.values(GAME.unlockedBuckets('technology')).filter (t) -> not t.owned()
        template: 'technologies'
    tabs
  assignment: ->
    name: 'People'
    items: -> _.values(GAME.buckets('assignments', 'people').get()).filter (a) -> a.unlocked()
    template: 'assignment'    
    col: 12