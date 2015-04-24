###

ok so here is the deal.

Game is the engine (game)

Game can have a resource added (resources)

Resources have a single value of any real number (value)

Resource values can increase or decrease by a set amount (updateValue)

Resource values can regularly increase or decrease by a amount (tick)

Resource ticks are the sum of all modifiers (modifier)

Game can have a modifier added (modifier)

Modifier names must be unique to to a Resource (key)

Modifiers can modify modifiers (subModifiers) 

Game can have a unlocks added (unlock)

Unlocks can apply modifiers [Action]


--- Under review
Games can have a trigger added (triggers)

Triggers can apply temporary modifiers [Action]
---

###

describe "Game", ->
  
  it "should exist", -> expect(Game).toBeDefined()

  beforeEach ->
    @game = new Game
    
  it "should have default empty buckets", ->
      expect(@game.resources).toEqual({})

  describe "addResource", ->
    beforeEach ->
      @resource = jasmine.createSpyObj('resource', ['play'])
      @resource.name = 'test'

    it "should exist", ->
      expect(@game.addResource).toBeDefined()
    
    it "should add a resource to self", ->
      @game.addResource(@resource)
      expect(@game.resources).toBeDefined({test: @resource})



  it "addModifier", ->
    expect(@game.addModifier).toBeDefined()

  it "pay", ->
    expect(@game.pay).toBeDefined()

  it "canPay", ->
    expect(@game.canPay).toBeDefined()

  it "start", ->
    expect(@game.start).toBeDefined()

  it "stop", ->
    expect(@game.stop).toBeDefined()

  it "getResources", ->
    expect(@game.getResources).toBeDefined()





