describe "Building", ->

  beforeEach ->
    @building = new Building name: 'test'

  describe 'instantiation option', ->
    it "`name` should be set", ->
      expect(@building.name).toBe 'test'

      building = new Building name: 'other'
      expect(building.name).toBe 'other'

    it "`name` should be required", ->
      expect(( -> new Building() )).toThrow()

    it "`cost` should be set", ->
      expect(@building.cost).toBeFalsy()

      cost = test: 1
      building = new Building name: 'test', cost: cost
      expect(building.cost).toBe cost

    it "`count` should default to 0", ->
      expect(@building.count).toBe 0

    it "`meta` should be set", ->
      building = new Building name: 'test', meta: 1
      expect(building.meta).toBe 1

      meta = test: true
      building = new Building name: 'test', meta: meta
      expect(building.meta).toBe meta

  it "cost as a function should have `this` state", ->
    @building.cost = -> @
    expect(@building.getCost()).toBe @building

  it "getCost should return cost if cost is an object", ->
    cost = test: 1
    @building.cost = cost
    expect(@building.getCost()).toBe cost

  it "getCost should return cost if cost is a function", ->
    cost = test: 1

    @building.cost = -> cost
    expect(@building.getCost()).toBe cost

  it "effect should be a function", ->
    expect(@building.effect.prototype).toBeTruthy()
    
  it 'getCount should return count', ->
    @building.count = 1
    expect(@building.getCount()).toBe 1

  it 'canBuy should run @state.canPay', ->
    @building.state = canPay: -> true
    expect(@building.canBuy()).toBe true

    @building.state = canPay: -> false
    expect(@building.canBuy()).toBe false

  it 'cannotBuy should the opposite of canBuy', ->
    spyOn(@building, "canBuy").and.returnValue true
    expect(@building.cannotBuy()).toBe false

  it 'buy should increase self count', ->
    @building.state = pay: -> true
    expect(@building.count).toBe 0
    @building.buy()
    expect(@building.count).toBe 1




