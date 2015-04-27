describe "Building", ->

  beforeEach ->
    @building = new Building()

  describe 'instantiation option', ->
    it "`name` should be set", ->
      expect(@resource.name).toBe 'test'

  it "getCost should return cost", ->
    cost = test: 1
    @building.cost = cost
    expect(@building.getCost()).toBe cost

  it "effect should be a function", ->
    expect(@building.effect.prototype).toBeTruthy()
    
