// not sure what this did?

// const tick = FunctionalMixin({
//   getTick: () ->
//     @_tickTracker = new Tracker.Dependency
//     @_tickTracker.depend()
//     @tickValue

//   runTick: -> @updateValue @tickValue

//   timeUntilValue: (value, interval) -> 
//     return Infinity if not value or value > @maxValue
//     (value - @value) / (@tickValue / interval)
// });
// Mixins.tick = tick