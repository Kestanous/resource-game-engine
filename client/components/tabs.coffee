Template.tabs.onCreated ->
  @current = new ReactiveVar(@data.tabs[0])

Template.tabs.helpers
  active: -> if Template.instance().current.get().name is @name then 'active'
  current: -> Template.instance().current.get()
  col: -> Template.instance().current.get().col || 6

Template.tabs.events
  'click .nav-item': (e, tpl) -> tpl.current.set @