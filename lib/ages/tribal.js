Game.ages.tribal = {
  ageEnd(game) {
    let military = game.buckets('technology', 'military');
    if (military) {
      return military.owned()
    }
  },
  resources: {
    shelter: {
      description: {
        value: 10,
        description() { return 'Poorly build shelter, but it keeps the rain out.'; }
      }
    },
    people: {
      description: {
        value: 25,
        calculateTick() { 
          return 0.001 * this.getValue();
        },
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
        value: 500,
        calculateMax() { return 50 + this.state.buckets('resources', 'shelter').getValue() * 50; },
        calculateMin() { return -10; },
        calculateTick() { 
          let people = this.state.buckets('resources', 'people')
          return -0.05 * ( people ? people.getValue() : 1 ) 
          + this.getModifier('hunters')
          + this.getModifier('farmers');
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
        },
        calculateTick() { 
          return this.getModifier('idlest', 0)
        }
      }
    },
    stone: {
      description: {
        description() {
          return 'You still don\'t know much but your understanding is growing.';   
        }
      },
      calculateTick() { 
        return this.getModifier('archaeologists', 0)
      }
    },
    'animal parts': {
      description: {
        description() {
          return 'You still don\'t know much but your understanding is growing.';   
        },
        calculateTick() { 
          return this.getModifier('farmers', 0)
        }
      }
    },
    shines: {
      description: {
        description() {
          return 'You still don\'t know much but your understanding is growing.';   
        },
        calculateTick() { 
          return this.getModifier('archaeologists', 0)
        }
      }
    },
    herbs: {
      description: {
        description() {
          return 'You still don\'t know much but your understanding is growing.';   
        },
        calculateTick() {
          return this.getModifier('herbalists', 0)
        }
      }
    }
  },
  actions: {
    expolore: {
      description: {
        effect() {
          let frac = Random.fraction()
          , deathMax = false ? .05 : .1
          , foodMax = false ? .3 : .4
          , scrapMax = false ? .80 : .93
          , evaluation = this.getModifier('evaluation')
          , scrapMulti = this.getModifier('surveying', 1)
          , scrap = 0;
          if (true) {

          }
        },
        waitTime() {
          // let teamwork = this.state.buckets('technology', 'teamwork')
          // if (teamwork.owned()) {
            return 5;
          // } else {
            // return this.state.buckets('resources', 'people').getValue() * .6;
          // }
        },
        description() {}
      }
    },
    farm: {
      description: {
        description() {}
      }
    },
    excavation: {
      description: {
        description() {}
      }
    },
    offer: {
      description: {
        description() {}
      }
    },
    attack: {
      description: {
        description() {}
      }
    },
    parlay: {
      description: {
        description() {}
      }
    },
    forge: {
      description: {
        description() {}
      }
    }
  },
  technology: {
    medicine: {
      description: {
        description() {}
      }
    },
    religion: {
      description: {
        description() {}
      }
    },
    topography: {
      description: {
        description() {}
      }
    },
    weaponry: {
      description: {
        description() {}
      }
    },
    military: {
      description: {
        description() {}
      }
    }
  },
  assignments: {
    people: {
      key(state) { return state.buckets('resources', 'people').getValue(); },
      idlest: {
        default: true,
        effect() {
          this.parent.state.buckets('resources', 'understanding').setModifier('idlest', 0.005 * this.getValue())
        },
        description() {}
      },
      hunters: {
        value: 10,
        effect() {
          this.parent.state.buckets('resources', 'food').setModifier('hunters', .2 * this.getValue())
        },
        description() {}
      },
      farmers: {
        effect() {
          this.parent.state.buckets('resources', 'food').setModifier('farmers', .2 * this.getValue())
          this.parent.state.buckets('resources', 'animal parts').setModifier('farmers', .02 * this.getValue())
        },
        description() {}
      },
      herbalists: {
        effect() {
          this.parent.state.buckets('resources', 'herbs').setModifier('herbalists', 0.02 * this.getValue())
        },
        description() {}
      },
      archaeologists: {
        effect() {
          this.parent.state.buckets('resources', 'shines').setModifier('archaeologists', 0.02 * this.getValue())
          this.parent.state.buckets('resources', 'stone').setModifier('archaeologists', 0.02 * this.getValue())
        },
        description() {}
      }
     }
  }
}