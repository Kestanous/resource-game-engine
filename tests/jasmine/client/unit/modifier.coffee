describe "Modifier", ->

  beforeEach ->
    @modifier = new Modifier name: 'test'

  describe 'instantiation', ->
    it "option `name` should be set", ->
      expect(@modifier.name).toBe 'test'

    it "option `name` should be required", ->
      expect((-> new Modifier)).toThrow()

    it "option `meta` should be set", ->
      modifier = new Modifier name: 'test', meta: 1
      expect(modifier.meta).toBe 1

      meta = test: true
      modifier = new Modifier name: 'test', meta: meta
      expect(modifier.meta).toBe meta

    describe "hide", ->
      it '`self` should be set', ->
        expect(@modifier.hide.get('self')).toBeFalsy()
        
        modifier = new Modifier name: 'test', hide: self: true
        expect(modifier.hide.get('self')).toBe(true)
  