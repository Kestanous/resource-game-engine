const technology = {
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
      return this.state.buckets('resources', 'understanding').getValue() > 14
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
      return this.state.buckets('resources', 'understanding').getValue() > 14
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
      return this.state.buckets('resources', 'understanding').getValue() > 14
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
        when scavenging but also reduces the chance of finding food.' 
      }
    },
    prerequisites() {
      let tech = this.state.buckets('technology', 'language')
      if (tech) return tech.owned()
    }
  },
  teamwork: {
    description: {
      cost() { return { understanding: 30 } },
      effect() { this.state.buckets('actions', 'hunt').setModifier('teamwork', true) },
      description() { return 'Increases the amount of food and reduces chance of death when hunting'; }
    },
    prerequisites() {
      let language = this.state.buckets('technology', 'language')
      let hunting = this.state.buckets('technology', 'hunting')
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
      let tech = this.state.buckets('technology', 'conservation')
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
      let tech = this.state.buckets('technology', 'conservation')
      if (tech) return tech.owned()
    }
  },
  surveying: {
    description: {
      cost() {
        return {
          understanding: 30
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
      let teamwork = this.state.buckets('technology', 'teamwork')
      let evaluation = this.state.buckets('technology', 'evaluation')
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
      let tech = this.state.buckets('technology', 'hunting')
      if (tech) return tech.owned()
    }
  },
  "animal farm": {
    description: {
      cost() {
        return {
          understanding: 30
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
      let tech = this.state.buckets('technology', 'animal handling')
      if (tech) return tech.owned() && this.state.buckets('resources', 'shelter').getValue() > 4 
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
      let tech = this.state.buckets('technology', 'hunting')
      if (tech) return tech.owned()
    }
  }
}
import {Technology} from 'meteor/private:game-engine';
Ages.scavenger.buckets.push({
  class: Technology,
  key: 'technology',
  items: technology
})