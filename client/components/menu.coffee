Template.menu.onCreated -> @saving = new ReactiveVar(false)

Template.menu.events
  'click .mdi-play': -> GAME.play()
  'click .mdi-pause': -> GAME.pause() 
  'click .mdi-replay': -> GAME.reset()
  'click .mdi-content-save': (e,tpl) -> 
    GAME.save() 
    tpl.saving.set(true)
    Meteor.setInterval(->
      tpl.saving.set(false)
    , 3000)

Template.menu.helpers
  pause: -> not GAME.running.get()
  saving: -> Template.instance().saving.get()