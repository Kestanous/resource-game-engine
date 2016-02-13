const modifier = FunctionalMixin({
  modifiers() { return this._modifiers || (this._modifiers = new ReactiveDict) },
  setModifier(key, value) {
    this.modifiers().set(key, value)
  },
  getModifier(key) {return this.modifiers().get(key) || 0 }
});

Mixins.modifier = modifier