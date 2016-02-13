const classMethods = Symbol("classMethods");

FunctionalMixin = function (behaviour) {
  const instanceKeys = _.keys(behaviour).filter(key => key !== classMethods);
  const methods = behaviour[classMethods] || {};
  function mixin (target) {
    for (let property of instanceKeys) target[property] = behaviour[property];
    for (let property in methods) target[property] = methods[property];
    return target;
  }
  return mixin;
}

FunctionalMixin.classMethods = classMethods;
Mixins = {}