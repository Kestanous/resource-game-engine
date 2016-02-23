const resources = {
  "combat capacity": {
    description: {
      value: 10,
      description() { return 'Your ability to defend yourself. Maybe even your ability to attack'; }      
    }
  },
  shelter: {
    description: {
      advance: true,
      value: 10,
      calculateMin() { return 1; },
      underMinValue() {
        log.message('You died, GAME OVER!', 'danger');
        this.state.onGameOver();
      },
      calculateMax() { 
        return 15 + this.getModifier('tribes', 0);
      },
      description() { return 'Poorly build shelter, but it keeps the rain out.'; }
    }
  },
  people: {
    description: {
      advance: true,
      value: 25,
      calculateTick() { 
        return 0.001 * this.getValue();
      },
      calculateMax() { 
        return Math.floor(this.state.buckets('resources', 'shelter').getValue() * 5); 
      },
      calculateMin() { return 1; },
      underMinValue() {
        log.message('You died, GAME OVER!', 'danger');
        this.state.onGameOver();
      },
      overMaxValue(excess) { 
        if (excess >= 1) { log.message(`You lost ${Math.floor(excess)} people!`, 'danger') }
        this.setValue(this.getMaxValue());
      },
      description() {
        return 'Strange folk but they seem willing to help';   
      }
    }
  },
  food: {
    description: {
      advance: true,
      value: 500,
      calculateMax() { return 50 + this.state.buckets('resources', 'shelter').getValue() * 50; },
      calculateMin() { return -10; },
      calculateTick() { 
        let people = this.state.buckets('resources', 'people')
        return -0.05 * ( people ? Math.floor(people.getValue()) : 1 ) 
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
  scrap: {
    description: {
      description() {
        return 'You still don\'t know much but your understanding is growing.';   
      }, 
      calculateTick() { 
        return this.getModifier('archaeologists', 0)
      }
    },
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
  shinies: {
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
  },
  //hidden values 
  tribeCount: {
    description: {
    },
    prerequisites() { return false }
  },
  attackCount: {
    description: {
      value: 100,
      calculateMax() {
        return 100
      },
      calculateTick() {
        return this.state.buckets('resources', "combat capacity").getValue() * .1
      },
    },
    prerequisites() { return false }
  }
}

Game.ages.tribal.buckets.push({
  class: Resource,
  key: 'resources',
  items: resources
})