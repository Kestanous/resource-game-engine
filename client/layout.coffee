Session.set('interval', 0.2)

@GAME = new Game()
GAME.onGameOver = () => 
  FlowRouter.go('/gameOver')
  GAME.stop()
GAME.onAgeEnd = () => 
  FlowRouter.go('/win')
  GAME.stop()

Template.ageLayout.onCreated => 
  GAME.start()

Template.ageLayout.helpers 
  game: => GAME