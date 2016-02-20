Template.tribalTab.onCreated -> 
  @current = new ReactiveVar(@data[0])
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
    if @key is instance.current.get().key then 'active' else 'text-' + instance._status(@)
  status: -> Template.instance()._status(@)


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