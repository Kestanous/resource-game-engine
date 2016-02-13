Game.ages.scavenger = {
  resources: {
    shelter: {
      description: {
        value: 1,
        description() {
          return 'Poorly build shelter, but it keeps the rain out.';
        }
      }
    },
    food: {
      description: {
        value: 100,
        calculateMax() { 
          return 50 + this.state.buckets('resources', 'shelter').getValue() * 50; 
        },
        calculateMin() { return -10; },
        calculateTick() { 
          return -0.1 * this.state.buckets('resources', 'people').getValue(); 
        },
        underMinValue() {
          people = this.state.buckets('resources', 'people')
          people.updateValue(-1)
          log.message('Someone starved to death!', 'danger')
          if (people.getValue()) {
            this.setValue(0)
          }
        },
        description() {
          return 'Ancient possessed food in cans and other such.';
        }
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
          log.message('You died, GAME OVER!', 'danger')
          this.state.stop()
        },
        description() {
          return 'Strange folk but they seem willing to help';   
        }
      }
    },
    scrap: {
      description: {
        description() {
          return 'Twisted bits of mettle and scraps of pages for old books.';   
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
        }
      }
    }
  },
  actions: {
    scavenge: {
      description: {
        effect() {
          let frac = Random.fraction()
          , peopleCount = this.state.buckets('resources', 'people').getValue();
          if (frac < .05) {
            let count = Random.choice(Array.from(new Array((peopleCount * .1 % 10).toFixed(0)), (x,i) => i));
            if (count) {
              log.message(`${count} people were killed!`, 'danger')
            } else log.message('You did not find anything.', 'warning')
          }
          if (frac > .05 && frac < .4) {
            let food = 1 + Random.choice(Array.from(new Array(5), (x,i) => i)) * peopleCount;
            if (food) log.message(`You found ${food} food.`)
            else log.message('You did not find anything.', 'warning')
            this.state.buckets('resources', 'food').updateValue(food)
          }
          if (frac > .4 && frac < .93) {
            let scrap = 1 + Random.choice(Array.from(new Array(10), (x,i) => i)) * peopleCount;
            if (scrap) log.message(`You found ${scrap} scrap.`)
            else log.message('You did not find anything.', 'warning')
            this.state.buckets('resources', 'scrap').updateValue(scrap)
          }
          if (frac > .93) {
            let people = Random.choice(Array.from(new Array(2), (x,i) => i)) * peopleCount;
            if (people) log.message(`You found ${people} people!`, 'success')
            else log.message('You did not find anything.', 'warning')
            extra = this.state.buckets('resources', 'people').updateValue(people)
            if (extra) log.message(`You could not house ${extra} people.`, 'warning')
          }
        },
        waitTime() {
          return this.state.buckets('resources', 'people').getValue() * .6;
        },
        cost() {
          return {
            food: 1 * this.state.buckets('resources', 'people').getValue()
          }
        },
        description() { 
          return 'Risk the world outside in hopes to find something of value' 
        }
      }
    },
    investigate: {
      description: {
        effect() {
          this.state.buckets('resources', 'understanding').updateValue(1) 
        },
        cost() {
          return {
            scrap: 10
          }
        },
        description() { 
          return 'Increases your understanding by 1' 
        }
      },
      prerequisites() {
        return this.buckets('resources', 'scrap').getValue() > 49
      }
    },
    "hunt": {
      description: {
        effect() {
          let peopleCount = this.state.buckets('resources', 'people').getValue()
          , frac = Random.fraction();
          if (frac > .90) {
            let dead = Math.round((peopleCount * .1) % 10); 
            console.log(dead, dead === 0)
            if (dead === 0)  dead = 1; //always kill >:(
            this.state.buckets('resources', 'people').updateValue(-dead)
            log.message(`${dead} people died on this hunt!`, 'danger')
          }
          let food = (frac * 10).toFixed(0) * peopleCount + 1;
          this.state.buckets('resources', 'food').updateValue(food)
          log.message(`You collected ${food} food.`)
          if (frac < .05) {
            this.state.buckets('resources', 'animals').updateValue(1)
            log.message(`You found an animal!`)
          }
        },
        waitTime() {
          return this.state.buckets('resources', 'people').getValue() * .6;
        },
        cost() {
          return {
            food: 1 * this.state.buckets('resources', 'people').getValue()
          }
        },
        description() { 
          return 'Send out a group to gather food, be warned this is dangerous!';
        }
      },
      prerequisites() {
        let tech = this.buckets('technology', 'hunting')
        if (tech) return tech.disabled()
      }
    }

  },
  technology: {
    hunting: {
      description: {
        cost() {
          return {
            understanding: 20
          }
        },
        description() { 
          return 'Lets you specialize in finding and killing food.' 
        }
      },
      // prerequisites() {
      //   return this.buckets('resources', 'understanding').getValue() > 14
      // }
    },
    conservation: {
      description: {
        cost() {
          return {
            understanding: 20
          }
        },
        description() { 
          return '' 
        }
      },
      // prerequisites() {
      //   return this.buckets('resources', 'understanding').getValue() > 14
      // }
    },
    language: {
      description: {
        cost() {
          return {
            understanding: 20
          }
        },
        description() { 
          return '' 
        }
      },
      // prerequisites() {
      //   return this.buckets('resources', 'understanding').getValue() > 14
      // }
    }
  }
}