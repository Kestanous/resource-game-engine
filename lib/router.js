FlowRouter.route('/', {
    action: function(params, queryParams) {
        BlazeLayout.render('layout', { main: "newGame" });
    }
});
FlowRouter.route('/game', {
    action: function(params, queryParams) {
        BlazeLayout.render('layout', { main: "game" });
    }
});
FlowRouter.route('/gameOver', {
    action: function(params, queryParams) {
        BlazeLayout.render('layout', { main: "gameOver" });
    }
});

FlowRouter.route('/win', {
    action: function(params, queryParams) {
        BlazeLayout.render('layout', { main: "win" });
    }
});