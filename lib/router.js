Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { return Meteor.subscribe('goals'); }
});

Router.map(function() {
    this.route('goalsList', {path: '/'});
    this.route('goalPage', {
        path: '/goals/:_id',
        data: function() { return Goals.findOne(this.params._id); }
    });
    this.route('goalEdit', {
        path: '/goals/:_id/edit',
        data: function() { return Goals.findOne(this.params._id); }
    });
    this.route('goalAdd', {
        path: '/addgoal'
    });
    this.route('goalChart', {
        path: '/viewChart/:_id/chart',
        data: function() { return Goals.findOne(this.params._id); }
    });
});
var requireLogin = function(pause) {
    if (! Meteor.user()) {
        if (Meteor.loggingIn())
            this.render(this.loadingTemplate);
        else
            this.render('accessDenied');
        pause();
    }
}
Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'goalAdd'});
Router.onBeforeAction(function() { clearErrors() });
