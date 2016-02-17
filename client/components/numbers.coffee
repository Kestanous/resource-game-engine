Template.shortNumber.helpers
  number: -> 
    return if not isFinite(@)
    if (@ > 1000) then numeral(@).format('0.[00]a')
    else numeral(@).format('0 a')

Template.tickNumber.helpers
  number: ->
    return if not isFinite(@)
    return if parseFloat(@) is 0
    numeral(@).format('+0.00a')
