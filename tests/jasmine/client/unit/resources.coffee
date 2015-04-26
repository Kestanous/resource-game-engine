describe "Resource", ->

  beforeEach ->
    @resource = new Resource(name: 'test')

  describe 'instantiation option', ->
    it "`name` should be set", ->
      expect(@resource.name).toBe 'test'

    it "`name` should be required", ->
      expect((-> new Resource)).toThrow()

    it '`tick` should default to 0', ->
      expect(@resource.modifiers.get('default')).toBe 0

    it "`tick` should be set", ->
      resource = new Resource name: 'test', tick: 1
      expect(resource.modifiers.get('default')).toBe 1

    it '`limit` should default to falsy', ->
      expect(@resource.limit).toBeFalsy()

    it "`limit` should be set", ->
      resource = new Resource name: 'test', limit: 1
      expect(resource.limit).toBe 1

    it "`meta` should be set", ->
      resource = new Resource name: 'test', meta: 1
      expect(resource.meta).toBe 1

      meta = test: true
      resource = new Resource name: 'test', meta: meta
      expect(resource.meta).toBe meta

    it "`calculateTick` should set a function", ->
      resource = new Resource 
        name: 'test'
        calculateTick: -> return 5
      expect(resource.calculateTick()).toBe 5

  describe "hide", ->
    it '`resource` should be set', ->
      expect(@resource.hide.get('self')).toBeFalsy()
      
      resource = new Resource name: 'test',  hide: self: true
      expect(resource.hide.get('self')).toBe(true)

    it '`value` should be set', ->
      expect(@resource.hide.get('value')).toBeFalsy()

      resource = new Resource name: 'test',  hide: value: true
      expect(resource.hide.get('value')).toBe(true)

    it '`limit` should be set', ->
      expect(@resource.hide.get('limit')).toBeFalsy()

      resource = new Resource name: 'test',  hide: limit: true
      expect(resource.hide.get('limit')).toBe(true)

    it '`tick` should be set', ->
      expect(@resource.hide.get('tick')).toBeFalsy()

      resource = new Resource name: 'test',  hide: tick: true
      expect(resource.hide.get('tick')).toBe(true)

  describe 'value', ->

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

    it 'setModifier add a modifier', ->
      @resource.setModifier 'key1', 1
      expect(@resource.modifiers.get('key1')).toBe(1)

      @resource.setModifier 'key2', 2
      expect(@resource.modifiers.get('key2')).toBe(2)

    it 'setModifier call should reflect in tickValue', ->
      resource = new Resource
        name: 'test'
        calculateTick: -> @modifiers.get('key')

      resource.setModifier 'key', 1
      expect(resource.tickValue).toBe(1)

    it 'getTickForRun should return tick', ->
      @resource.tickValue = 1
      expect(@resource.getTickForRun()).toBe(1)
    
    it 'getTickForRun with modifiers and set calculateTick should return tick', ->
      resource = new Resource
        name: 'test'
        calculateTick: -> @modifiers.get('key1') + @modifiers.get('key2')

      resource.setModifier 'key1', 1
      resource.setModifier 'key2', 2

      expect(resource.getTickForRun()).toBe(3)

    it 'timeUntilValue should return time until value is reached', ->
      @resource.value = 0
      @resource.tickValue = 1
      @resource.state = interval: 1
      expect(@resource.timeUntilValue(10)).toBe(10)

      @resource.tickValue = 2
      expect(@resource.timeUntilValue(10)).toBe(5)

