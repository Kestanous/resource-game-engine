Game.ages.tribal = {
  ageEnd(game) {
    let shelter = game.buckets('resources', 'shelter')
    , food = game.buckets('resources', 'food')
    , animalFarm = game.buckets('technology', 'animal farm');
    if (shelter && food && animalFarm) {
      return shelter.getValue() > 9 && food.getValue() > 499 && animalFarm.owned()
    }
  },
  resources: {
    shelter: {
      description: {
        value: 1,
        description() { return 'Poorly build shelter, but it keeps the rain out.'; }
      }
    },
    people: {
      description: {
        value: 1,
        calculateMax() { 
          return this.state.buckets('resources', 'shelter').getValue() * 5; 
        },
        calculateMin() { return 1; },
        underMinValue() {
          log.message('You died, GAME OVER!', 'danger');
          this.state.onGameOver();
        },
        description() {
          return 'Strange folk but they seem willing to help';   
        }
      }
    },
    food: {
      description: {
        value: 100,
        calculateMax() { return 50 + this.state.buckets('resources', 'shelter').getValue() * 50; },
        calculateMin() { return -10; },
        calculateTick() { 
          let people = this.state.buckets('resources', 'people')
          return -0.1 
            * ( people ? people.getValue() : 1 )
            * this.getModifier('preservation', 1);
        },
        underMinValue() {
          people = this.state.buckets('resources', 'people');
          people.updateValue(-1);
          log.message('Someone starved to death!', 'danger');
          if (people.getValue()) { this.setValue(0); }
        },
        description() {
          return 'Ancient possessed food in cans and other such.';
        }
      }
    },    
    understanding: {
      description: {
        description() {
          return 'You still don\'t know much but your understanding is growing.';   
        }
      }
    },
    stone: {
      description: {
        description() {
          return 'You still don\'t know much but your understanding is growing.';   
        }
      }
    },
    'animal parts': {
      description: {
        description() {
          return 'You still don\'t know much but your understanding is growing.';   
        }
      }
    },
    shines: {
      description: {
        description() {
          return 'You still don\'t know much but your understanding is growing.';   
        }
      }
    },
    herbs: {
      description: {
        description() {
          return 'You still don\'t know much but your understanding is growing.';   
        }
      }
    }
  },
  actions: {},
  technology: {},
  assignments: {
    people: {
      key(state) { return state.buckets('resources', 'people').getValue(); },
      hunt: {},
      farm: {},
      scout: {},
      ponder: {
        default: true
      }
    }
  }
}