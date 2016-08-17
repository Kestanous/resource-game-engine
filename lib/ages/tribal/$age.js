if (!this.Ages) { this.Ages = {} }
Ages.tribal = {
  ageEnd(game) {
    let military = game.buckets('technology', 'military');
    if (military) {
      return military.owned()
    }
  },
  buckets: []
}
