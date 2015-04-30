Modules.modifierModule = 
  constructor: ->
    @_modifierTracker = new Tracker.Dependency
    @modifiers = new ReactiveDict
  setModifier: (key, value) ->
    @modifiers.set(key, value)
    @_modifierTracker.changed()
  getModifier: (key) -> @modifiers.get(key) or 0