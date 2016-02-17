  Template.assignment.helpers 
    not: (value) -> ! value
    disable: -> if @default or ( not @canAdd() and not @canRemove() )  then 'disabled'
    removeOne: -> 'removeOne' if not @canRemove(10)
    addOne: -> 'addOne' if not @canAdd(10)

  Template.assignment.events
    'click .addOne': -> @add(1)
    'click .removeOne': -> @remove(1)
    'click .add': (e, t) -> @add $(e.target).data().value
    'click .remove': (e, t) -> @remove $(e.target).data().value
    'click .reset': (e, t) -> @parent.reset()