describe "Resource", ->

  beforeEach ->
    @resource = new Resource(name: 'test')

  describe 'instantiation', ->
    it "option `name` should be set", ->
      expect(@resource.name).toBe('test')

    it "option `name` should be required", ->
      expect((-> new Resource)).toThrow()

    it 'instantiation option `tick` should default to 0', ->
      expect(@resource.tickValue).toBe(0)

    it "instantiation option `tick` should be set", ->
      resource = new Resource name: 'test', tick: 1
      expect(resource.tickValue).toBe(1)

    it 'instantiation option `limit` should default to falsy', ->
      expect(@resource.limit).toBeFalsy()

    it "instantiation option `limit` should be set", ->
      resource = new Resource name: 'test', limit: 1
      expect(resource.limit).toBe(1)

    it "option `hide` should be set", ->
      expect(@resource._hide.get()).toBeFalsy()

      resource = new Resource name: 'test',  hide: true
      expect(resource._hide.get()).toBe(true)

  it "getValue should return the current value", ->
    @resource.value = 1
    expect(@resource.getValue()).toBe(1)

  describe 'limit', ->

    it "getLimit should return the current limit", ->
      @resource.limit = 1
      expect(@resource.getLimit()).toBe(1)

    it "updateLimit should set the current limit", ->
      @resource.limit = 1
      @resource.updateLimit(2)
      expect(@resource.limit).toBe(2)

    it "atLimit should be true if value is at the limit", ->
      @resource.value = 1
      @resource.limit = 10
      expect(@resource.atLimit()).toBeFalsy()
      
      @resource.value = 10
      @resource.limit = 10
      expect(@resource.atLimit()).toBe(true)
      

  describe 'update', ->
    beforeEach ->
      @resource.value = 1

    it "should add argument to current value", ->
      @resource.update(1)
      expect(@resource.value).toBe(2)
      @resource.update(-1)
      expect(@resource.value).toBe(1)

    it "should not set value below 0", ->
      @resource.update(-1)
      expect(@resource.value).toBe(0)

      @resource.value = 1
      @resource.update(-10)
      expect(@resource.value).toBe(0)

    it "should not set value above the limit", ->
      @resource.limit = 10
      @resource.update(9)
      expect(@resource.value).toBe(10)

      @resource.limit = 10
      @resource.value = 1
      @resource.update(100)
      expect(@resource.value).toBe(10)

  describe 'tickValue', ->

    it "getTick should return the current tick", ->
      @resource.tickValue = 1
      expect(@resource.getTick()).toBe(1)

    it 'runTick should update the value by the tick', ->
      @resource.value = 1
      @resource.tickValue = 1
      @resource.runTick()
      expect(@resource.value).toBe(2)

    it 'setValuesToAdd should add to tick', ->
      @resource.setValuesToAdd 'key1', 1
      expect(@resource.tickValue).toBe(1)

      @resource.setValuesToAdd 'key2', 1
      expect(@resource.tickValue).toBe(2)

    it 'setValuesToMultiply should multiply tick', ->
      @resource.setValuesToAdd 'add', 2
      @resource.setValuesToMultiply 'multiply', 2
      expect(@resource.tickValue).toBe(4)

    it 'timeUntilValue should return time until value is reached', ->
      @resource.value = 0
      @resource.tickValue = 1
      @resource.state = interval: 1
      expect(@resource.timeUntilValue(10)).toBe(10)

      @resource.tickValue = 2
      expect(@resource.timeUntilValue(10)).toBe(5)

  it 'canSee should return the opposite of _hide', ->
    expect(@resource.canSee()).toBe(true)
    @resource._hide.set true
    expect(@resource.canSee()).toBe(false)
    @resource._hide.set false
    expect(@resource.canSee()).toBe(true)

