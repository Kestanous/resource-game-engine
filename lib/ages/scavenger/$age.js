Game.ages.scavenger = {
  ageEnd(game) {
    let shelter = game.buckets('resources', 'shelter')
    , food = game.buckets('resources', 'food')
    , animalFarm = game.buckets('technology', 'animal farm');
    if (shelter && food && animalFarm) {
      return shelter.getValue() > 9 && food.getValue() > 499 && animalFarm.owned()
    }
  },
  buckets: []
}
