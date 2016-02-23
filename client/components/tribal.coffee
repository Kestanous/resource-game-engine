Template.tribalTab.onCreated -> 
  @current = new ReactiveVar()
  @items = new ReactiveVar([])
  @autorun (c) =>
    data = _.values(GAME.unlockedBuckets('tribes')).filter (t) -> not t.isDestroyed()
    @items.set data
    if data[0] and not @current.get() then @current.set data[0]
    

  @_status = (t) =>
    switch t.disposition()
      when 'hostile'
        'danger'
      when 'neutral'
        'info'
      when 'friendly'
        'success'

Template.tribalTab.helpers 
  currentItem: -> Template.instance().current.get()
  active: -> 
    instance = Template.instance()
    if @key is instance.current.get()?.key then 'active' else 'text-' + instance._status(@)
  status: -> Template.instance()._status(@)
  explore: -> GAME.unlockedBuckets('actions', 'explore')
  items: -> Template.instance().items.get()


Template.tribalTab.events 
  'click .tribalTab': (e, tpl) -> tpl.current.set @
  'click .talk': () -> @talk()
  'click .bribe': () -> @bribe()
  'click .attack': () -> @attack()
  'click .trade': () -> @trade()
  'click .merge': () -> @merge()

Template.tribalTabItem.helpers 
  status: -> 
    return 'danger' if @disposition() is 'hostile'
    return 'success' if @disposition() is 'friendly'
