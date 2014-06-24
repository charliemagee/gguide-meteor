Meteor.subscribe("goals");

UI.body.rendered = function(){
    $('body').hammer();
}
