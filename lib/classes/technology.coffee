class @Technology extends Module
  @include Modules.cost
  constructor: () ->
    super
    @active = new ReactiveVar false