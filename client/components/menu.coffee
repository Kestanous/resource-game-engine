Template.menu.onRendered -> @$('[data-toggle="tooltip"]').tooltip()
Template.menu.events
  'click .mdi-play': -> GAME.play()
  'click .mdi-pause': -> GAME.pause() 
  'click .mdi-content-save': -> GAME.save()
  'click .mdi-replay': -> GAME.reset() 

Template.menu.helpers
  pause: -> not GAME.running.get()