Template.hoverHint.helpers
  hint: ->
    hoverHint = Session.get('hoverHint')
    return unless hoverHint?.bucket && hoverHint.key
    keys = hoverHint.key.split('.')
    bucket = GAME.unlockedBuckets(hoverHint.bucket, keys[0], keys[1])  
    return unless bucket
    return {
      hint: bucket.getHint(),
      bucket: bucket.bucket,
      name: bucket.name()
    }