Game.ages.scavenger = {
  resources: {
    shelter: {
      description: {
        value: 1,
        description() { return 'Poorly build shelter, but it keeps the rain out.'; }
      }
    },
    food: {
      description: {
        value: 100,
        calculateMax() { return 50 + this.state.buckets('resources', 'shelter').getValue() * 50; },
        calculateMin() { return -10; },
        calculateTick() { 
          return -0.1 
            * this.state.buckets('resources', 'people').getValue()
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
    people: {
      description: {
        value: 1,
        calculateMax() { 
          return this.state.buckets('resources', 'shelter').getValue() * 5; 
        },
        calculateMin() { return 1; },
        underMinValue() {
          log.message('You died, GAME OVER!', 'danger');
          this.state.stop();
        },
        description() {
          return 'Strange folk but they seem willing to help';   
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
  },
  actions: {
    scavenge: {
      description: {
        effect() {
          let frac = Random.fraction()
          , peopleCount = this.state.buckets('resources', 'people').getValue()
          , diplomacy = this.getModifier('diplomacy')
          , deathMax = diplomacy ? .05 : .1
          , foodMax = diplomacy ? .3 : .4
          , scrapMax = diplomacy ? .80 : .93
          , evaluation = this.getModifier('evaluation')
          , scrapMulti = this.getModifier('surveying', 1)
          , scrap = 0;
          if (frac < deathMax) {
            let count = Math.round(peopleCount * .1)
            if (count) {
              this.state.buckets('resources', 'people').updateValue(-count)
              log.message(`${count} people were killed!`, 'danger')
            } else log.message('You did not find anything.', 'warning')
          }
          if (frac > deathMax && frac < foodMax) {
            let food = 1 + Random.choice(Array.from(new Array(5), (x,i) => i)) * peopleCount;
            if (food) log.message(`You found ${food} food.`)
            else log.message('You did not find anything.', 'warning')
            this.state.buckets('resources', 'food').updateValue(food)
          }
          if (frac > foodMax && frac < scrapMax) {
            scrap = 1 + Random.choice(Array.from(new Array(10), (x,i) => i)) * peopleCount;
          }
          if (frac > scrapMax) {
            let people = Random.choice(Array.from(new Array(2), (x,i) => i)) * peopleCount;
            if (people) log.message(`You found ${people} people!`, 'success')
            else log.message('You did not find anything.', 'warning')
            extra = this.state.buckets('resources', 'people').updateValue(people)
            if (extra) log.message(`You could not house ${extra} people.`, 'warning')
          }
          if (evaluation || scrap) {
            if (evaluation) {
              scrap += Math.round(peopleCount * 1)
            }
            if (scrap) {
              scrap = scrap * scrapMulti
              log.message(`You found ${scrap} scrap.`)
              this.state.buckets('resources', 'scrap').updateValue(scrap)
            } else log.message('You did not find anything.', 'warning')
          }
        },
        waitTime() {
          let teamwork = this.state.buckets('technology', 'teamwork')
          if (teamwork) {
            return 2;
          } else {
            return this.state.buckets('resources', 'people').getValue() * .6;
          }
        },
        cost() {
          return {
            food: Math.round( 1 * 
              this.state.buckets('resources', 'people').getValue() * 
              this.getModifier('conservation', 1)) || 1
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
          this.state.buckets('resources', 'understanding').updateValue(1 * this.getModifier('language', 1)) 
        },
        cost() {
          return {
            scrap: 10
          }
        },
        description() { 
          return 'Increases your understanding by ' + this.getModifier('language', 1) * 1 
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
          , frac = Random.fraction()
          , teamwork = this.getModifier('teamwork')
          , deathMax = teamwork ? .95 : .90
          , foodMulti = teamwork ? 15 : 10
          , animalMax = teamwork ? .10 : .05;

          if (frac > deathMax) {
            let dead = Math.round((peopleCount * .1) % 10); 
            if (dead === 0)  dead = 1; //always kill >:(
            this.state.buckets('resources', 'people').updateValue(-dead)
            log.message(`${dead} people died on this hunt!`, 'danger')
          }
          let food = (frac * foodMulti).toFixed(0) * peopleCount + 1;
          this.state.buckets('resources', 'food').updateValue(food)
          log.message(`You collected ${food} food.`)
          if (frac < animalMax) {
            this.state.buckets('resources', 'animals').updateValue(this.getModifier("animal handling", 1))
            log.message(`You found an animal!`, 'success')
          }
        },
        waitTime() {
          let teamwork = this.state.buckets('technology', 'teamwork')
          if (teamwork) {
            return 1.5;
          } else {
            return this.state.buckets('resources', 'people').getValue() * .6;
          }
        },
        cost() {
          return {
            food: Math.round( 1 * 
              this.state.buckets('resources', 'people').getValue() * 
              this.getModifier('conservation', 1)) || 1
          }
        },
        description() { return 'Send out a group to gather food, be warned this is dangerous!'; }
      },
      prerequisites() {
        let tech = this.buckets('technology', 'hunting')
        if (tech) return tech.owned()
      }
    },
    butchering: {
      description: {
        effect() {
          this.state.buckets('resources', 'food').updateValue(100)
        },
        cost() {
          return { animals: 10 }; 
        },
        description() { return 'Collect 100 food'; }
      },
      prerequisites() {
        let tech = this.buckets('technology', 'animal farm')
        if (tech) return tech.owned()
      }
    },
    'build shelter': {
      description: {
        effect() {
          this.state.buckets('resources', 'shelter').updateValue(1)
        },
        cost() {
          return { scrap: 200 }; 
        },
        description() { return 'Build a place for more people to say.'; }
      },
      prerequisites() {
        let tech = this.buckets('technology', 'crafting')
        if (tech) return tech.owned()
      }
    }
  },
  technology: {
    hunting: {
      description: {
        cost() {
          return {
            understanding: 10
          }
        },
        description() { 
          return 'Lets you specialize in finding and killing food.' 
        }
      },
      prerequisites() {
        return this.buckets('resources', 'understanding').getValue() > 14
      }
    },
    conservation: {
      description: {
        cost() {
          return {
            understanding: 10
          }
        },
        effect() {
          _.values(this.state.buckets('actions')).forEach( (a) => {
            a.setModifier('conservation', 0.5)
          })
        },
        description() { 
          return 'Reduces food cost for actions' 
        }
      },
      prerequisites() {
        return this.buckets('resources', 'understanding').getValue() > 14
      }
    },
    language: {
      description: {
        cost() {
          return {
            understanding: 10
          }
        },
        effect() {
          this.state.buckets('actions', 'investigate').setModifier('language', 2)
        },
        description() { 
          return 'Investigation results in greater understanding' 
        }
      },
      prerequisites() {
        return this.buckets('resources', 'understanding').getValue() > 14
      }
    },
    diplomacy: {
      description: {
        cost() {
          return { understanding: 20 }
        },
        effect() {
          this.state.buckets('actions', 'scavenge').setModifier('diplomacy', true)
        },
        description() { 
          return 'Increases the chance of finding people and reduces chance of death \
          when scavenging but also reduces the chance of finding food food' 
        }
      },
      prerequisites() {
        let tech = this.buckets('technology', 'language')
        if (tech) return tech.owned()
      }
    },
    teamwork: {
      description: {
        cost() { return { understanding: 20 } },
        effect() { this.state.buckets('actions', 'hunt').setModifier('teamwork', true) },
        description() { return 'Increases the amount of food and reduces chance of death when hunting'; }
      },
      prerequisites() {
        let language = this.buckets('technology', 'language')
        let hunting = this.buckets('technology', 'hunting')
        if (language && hunting) return language.owned() && hunting.owned();
      }
    },
    preservation: {
      description: {
        cost() {
          return {
            understanding: 20
          }
        },
        effect() {
          this.state.buckets('resources', 'food').setModifier('preservation', 0.5)
        },
        description() { 
          return 'Reduces food decay' 
        }
      },
      prerequisites() {
        let tech = this.buckets('technology', 'conservation')
        if (tech) return tech.owned()
      }
    },
    evaluation: {
      description: {
        cost() {
          return {
            understanding: 20
          }
        },
        effect() {
          this.state.buckets('actions', 'scavenge').setModifier('evaluation', true)
        },
        description() { 
          return 'Always find some scrap when you scavenge' 
        }
      },
      prerequisites() {
        let tech = this.buckets('technology', 'conservation')
        if (tech) return tech.owned()
      }
    },
    surveying: {
      description: {
        cost() {
          return {
            understanding: 20
          }
        },
        effect() {
          this.state.buckets('actions', 'scavenge').setModifier('surveying', 2)
        },
        description() { 
          return 'greatly increases the amount of scrap you get from scavenge' 
        }
      },
      prerequisites() {
        let teamwork = this.buckets('technology', 'teamwork')
        let evaluation = this.buckets('technology', 'evaluation')
        if (teamwork && evaluation) return teamwork.owned() && evaluation.owned();
      }
    },
    "animal handling": {
      description: {
        cost() {
          return {
            understanding: 20
          }
        },
        effect() {
          this.state.buckets('actions', 'hunt').setModifier('animal handling', 2);
          this.state.buckets('resources', 'animals').setModifier('animal handling', .01)
        },
        description() { 
          return 'Increases chance of finding animals and allows animal breeding.' 
        }
      },
      prerequisites() {
        let tech = this.buckets('technology', 'hunting')
        if (tech) return tech.owned()
      }
    },
    "animal farm": {
      description: {
        cost() {
          return {
            understanding: 20
          }
        },
        effect() {
          this.state.buckets('resources', 'animals').setModifier('animal farm', 10)
        },
        description() { 
          return 'Increases animal cap by 10 for every shelter. It also unlocks butchering.' 
        }
      },
      prerequisites() {
        let tech = this.buckets('technology', 'animal handling')
        if (tech) return tech.owned()
      }
    },  
    crafting: {
      description: {
        cost() {
          return {
            understanding: 20
          }
        },
        description() { 
          return 'Lets you build shelter' 
        }
      },
      prerequisites() {
        let tech = this.buckets('technology', 'hunting')
        if (tech) return tech.owned()
      }
    }
  }
}