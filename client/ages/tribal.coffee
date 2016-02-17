Template.tribal.events 'mouseenter .hint': -> Session.set "hoverHint", {bucket: @bucket, key: @key}

Template.tribal.helpers
  resources: -> _.values(GAME.unlockedBuckets('resources'))
  ownedTech: -> 
    name: 'Technology Owned'
    height: 145
    items: _.values(GAME.unlockedBuckets('technology')).filter (t) -> t.owned()
  tabsData: ->
    return [
      {
        name: 'Actions'
        items: _.values(GAME.unlockedBuckets('actions'))
        template: 'action'
        col: 4
      }
      {
        name: 'Technology'
        items: _.values(GAME.unlockedBuckets('technology')).filter (t) -> not t.owned()
        template: 'technology'
        col: 4
      }
    ]
  assignment: ->
    name: 'People'
    items: _.values(GAME.unlockedBuckets('assignments', 'people').get()).filter (a) -> a.unlocked()
    template: 'assignment'    
    col: 12