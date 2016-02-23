const actions = {
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
        if (teamwork.owned()) {
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
  butcher: {
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
      disable() {
        return this.state.buckets('resources', 'shelter').getValue() >= 15
      },
      description() { return 'Build a place for more people to say.'; }
    },
    prerequisites() {
      let tech = this.buckets('technology', 'crafting')
      if (tech) return tech.owned()
    }
  },
  'advance age!': {
    description: {
      effect() {
        this.state.advanceAge('tribal')
      },
      description() { return 'Leave this wasteland and found a tribe.'; }
    },
    prerequisites() {
      let shelter = this.buckets('resources', 'shelter')
      , food = this.buckets('resources', 'food')
      , animalFarm = this.buckets('technology', 'animal farm');
      if (shelter && food && animalFarm) {
        return shelter.getValue() > 9 && food.getValue() > 499 && animalFarm.owned()
      }
    }
  }
}

Game.ages.scavenger.buckets.push({
  class: Action,
  key: 'actions',
  items: actions
})