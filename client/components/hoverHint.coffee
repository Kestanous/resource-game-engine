Template.hoverHint.helpers
  hint: ->
    hoverHint = Session.get('hoverHint')
    return unless hoverHint?.bucket && hoverHint.key
    keys = hoverHint.key.split('.')
    bucket = GAME.unlockedBuckets(hoverHint.bucket, keys[0], keys[1])  
    return unless bucket
    hint = bucket.getHint()
    hint.bucket = bucket.bucket
    hint.name = bucket.name()
    return hint