class @People extends Module
  @include Modules.valueModule
  @include Modules.modifierModule
  @include Modules.assignmentModule
  constructor: (config, @state) ->
    super
    @name = 'people'
    @assignmentOptions.set [
      'woodcutter'
      'farmer'
    ]

    Tracker.autorun =>
      @setValue(@modifiers.get('houses') or 0)    
    
    Tracker.autorun =>
      @assignmentCapacity.set @getValue()

    Tracker.autorun =>
      @state.resources.food.setModifier 'people', -0.5 * @getValue()

    Tracker.autorun =>
      @state.resources.wood.setModifier 'woodcutters', 0.015 * @assignment.get('woodcutter')

    Tracker.autorun =>
      @state.resources.food.setModifier 'farmers', 1 * @assignment.get('farmer')

    Tracker.autorun =>