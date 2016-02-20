const assignments = {
  people: {
    description: {
      bound(state) { return state.buckets('resources', 'people').getValue(); },
      tasks: {
        idlest: {
          default: true,
          effect() {
            this.parent.state.buckets('resources', 'understanding').setModifier('idlest', 0.005 * this.getValue())
          },
          description() {
            return `Ideal hands are not totally useless, grants ${Game.tickNumber(.005)} understanding each`
          }
        },
        farmers: {
          value: 13,
          effect() {
            this.parent.state.buckets('resources', 'food').setModifier('farmers', .2 * this.getValue())
            this.parent.state.buckets('resources', 'animal parts').setModifier('farmers', .01 * this.getValue())
          },
          description() {
            return `Actual farms, wonderful! Grants ${Game.tickNumber(.2)} food 
            and ${Game.tickNumber(.02)} animal parts each`
          }, 
        },
        herbalists: {
          effect() {
            this.parent.state.buckets('resources', 'herbs').setModifier('herbalists', 0.02 * this.getValue())
          },
          description() {
            return `Hurbalists collect usesful plants. Grants ${Game.tickNumber(.02)} hurbs each`
          }, 
          prerequisites() { return false }
        },
        archaeologists: {
          effect() {
            this.parent.state.buckets('resources', 'shinies').setModifier('archaeologists', 0.02 * this.getValue())
            this.parent.state.buckets('resources', 'scrap').setModifier('archaeologists', 0.02 * this.getValue())
          },
          description() {
            return `Scavangers really, but don't tell them that. Grants ${Game.tickNumber(.02)} 'shinies' 
            and ${Game.tickNumber(.02)} scrap each`
          }, 
          prerequisites() { return false }
        } 
      } 
    }  
  }
}

Game.ages.tribal.buckets.push({
  class: Assignment,
  key: 'assignments',
  items: assignments
})