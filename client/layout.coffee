Meteor.disconnect() if (false) #disable hot-code-push and reduce server side work by a shit ton.
Session.set('interval', 0.2)
@GAME = new Game('scavenger')
GAME.onGameOver = () => 
  FlowRouter.go('/gameOver')
  GAME.stop()

Template.ageLayout.onCreated => GAME.start()

Template.ageLayout.helpers
  game: => GAME
  running: => GAME.running.get()