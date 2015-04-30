moduleKeywords = ['extended', 'included', 'constructor']

class Module
  constructor: ->
    init.call(@) for init in @inits

  @extend: (obj) ->
    for key, value of obj when key not in moduleKeywords
      @[key] = value

    obj.extended?.apply(@)
    this

  @include: (obj) ->
    for key, value of obj when key not in moduleKeywords
      # Assign properties to the prototype
      @::[key] = value

    #mock constrictor 
    @::inits ?= []
    @::inits.push obj.constructor if obj.constructor

    obj.included?.apply(@)
    this

Modules = {}