import {FunctionalMixin} from "./mixins.js";
const modifier = FunctionalMixin({
  modifiers() { return this._modifiers || (this._modifiers = new ReactiveDict) },
  setModifier(key, value) { this.modifiers().set(key, value) },
  getModifier(key, falsyDefault=0) { return this.modifiers().get(key) || falsyDefault },
  getAllModifier() {
    return this.modifiers().all()
  }
});

export {modifier};