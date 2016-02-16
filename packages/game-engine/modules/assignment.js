// # TODO, add a max scoped for each assignment option
const assignment = FunctionalMixin({
  
});

Mixins.assignment = assignment
// Modules.assignment =
//   constructor: ->
//     @assignment = new ReactiveDict
//     @assignmentAvailable = new ReactiveVar(0)
//     @assignmentCapacity = new ReactiveVar(0)
//     @assignmentSlots = new ReactiveVar([])
//     @_assignmentOldCapacity = 0
//     @assignmentCapacityAutorun = Tracker.autorun => @_assignmentCapUpdate()

//   isAnAssignmentSlot: (key) -> _.contains @assignmentSlots.get(), key
//   _assignmentCapUpdate: () ->
//     newValue = @assignmentCapacity.get()
//     oldValue = @_assignmentOldCapacity
//     offsetValue = newValue - oldValue
//     Tracker.nonreactive =>
//       if offsetValue < 0 #if limit goes down
//           avalibleOffset = @assignmentAvailable.get() + offsetValue
//           if avalibleOffset < 0 #and if we are over assigned
//             unless @assignmentOverCapacity(Math.abs(avalibleOffset)) #request conflict resolve
//               #if assignmentOverCapacity returns false there is nothing we can do
//               throw new Meteor.Error('AssignmentModule', 'can not resolve over capacity')
//       @_assignmentOldCapacity = newValue
//       @assignmentAvailable.set @assignmentAvailable.get() + offsetValue

//   assignmentOverCapacity: -> #noop for overload

//   setAssignment: (key, value, set) ->
//     Tracker.nonreactive => #never rerun, holy shit!
//       unless @isAnAssignmentSlot(key)
//         throw new Meteor.Error('AssignmentModule', "key: #{key} not found")

//       currentValue = @assignment.get(key) or 0
//       maxAvailable = @assignmentAvailable.get() + currentValue
//       if set
//         targetValue = value
//       else
//         targetValue = currentValue + value

//       return @_assignTo(key, 0, currentValue) if targetValue < 1
//       return @_assignTo(key, maxAvailable, currentValue) if targetValue >= maxAvailable
//       @_assignTo(key, targetValue, currentValue)

//   getAssignment: (key) -> @assignment.get(key) or 0

//   _assignTo: (key, value, current) ->
//     diff = value - (current or 0)
//     unless diff is 0 #no change, don't invalidate
//       @assignmentAvailable.set(@assignmentAvailable.get() - diff)
//     @assignment.set(key, value)