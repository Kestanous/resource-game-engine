const resources = {
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
        this.state.gameOver();
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
  scrap: {
    description: {
      description() {
        return 'Twisted bits of metal and scraps of pages for old books.';   
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
  animals: {
    description: {
      description() {
        return 'Beasts of the wild, but maybe not that wild';   
      },
      calculateMax() { return 10 + (this.getModifier('animal farm') * this.state.buckets('resources', 'shelter').getValue() ); },
      calculateTick() { 
        if (this.getValue() > 1) {
          return Math.floor(this.getValue()) * this.getModifier('animal handling');
        } else 0
      },
    }
  }
}

Game.ages.scavenger.buckets.push({
  class: Resource,
  key: 'resources',
  items: resources
})