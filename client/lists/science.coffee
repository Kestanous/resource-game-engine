Game.addItem
  name: 'language'
  class: Technology
  bucket: 'technology'

Game.addItem
  name: 'diplomacy'
  class: Technology
  bucket: 'technology'
  prerequisites: () -> @buckets.technology.language.active.get()

Game.addItem
  name: 'mentoring'
  class: Technology
  bucket: 'technology'
  prerequisites: () -> @buckets.technology.diplomacy.active.get()
  
Game.addItem
  name: 'conservation'
  class: Technology
  bucket: 'technology'

Game.addItem
  name: 'preservation'
  class: Technology
  bucket: 'technology'
  prerequisites: () -> @buckets.technology.conservation.active.get()

Game.addItem
  name: 'evaluation'
  class: Technology
  bucket: 'technology'
  prerequisites: () -> @buckets.technology.conservation.active.get()

Game.addItem
  name: 'surveying'
  class: Technology
  bucket: 'technology'
  prerequisites: () -> @buckets.technology.evaluation.active.get() and @buckets.technology.teemwork.active.get()

Game.addItem
  name: 'hunting'
  class: Technology
  bucket: 'technology'

Game.addItem
  name: 'teemwork'
  class: Technology
  bucket: 'technology'
  prerequisites: () -> @buckets.technology.hunting.active.get() and @buckets.technology.language.active.get()

Game.addItem
  name: 'crafting'
  class: Technology
  bucket: 'technology'
  prerequisites: () -> @buckets.technology.hunting.active.get()

Game.addItem
  name: 'shelter'
  class: Technology
  bucket: 'technology'
  prerequisites: () -> @buckets.technology.crafting.active.get()

Game.addItem
  name: 'animal handling '
  class: Technology
  bucket: 'technology'
  prerequisites: () -> @buckets.technology.hunting.active.get()

