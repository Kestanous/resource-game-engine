Template.hoverHint.helpers
  bucket: -> 
    {bucket} = Session.get('hoverHint')
    bucket
  key: -> 
    {key} = Session.get('hoverHint')
    key
  hint: ->
    hoverHint = Session.get('hoverHint')
    return unless hoverHint?.bucket && hoverHint.key
    bucket = GAME.unlockedBuckets(hoverHint.bucket, hoverHint.key)
    return unless bucket
    bucket.getHint()