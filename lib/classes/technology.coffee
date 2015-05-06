class @Technology extends Module
  @include Modules.cost
  constructor: () ->
    @active = new ReactiveVar false