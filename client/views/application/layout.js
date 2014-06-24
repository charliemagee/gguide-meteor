Template.layout.helpers({
    showCategory: function() { return Session.get('showCategory'); }
});

Template.layout.events = {
    'tap #home': function (e) {
        console.log('tap add goal');
        $('.navbuttons').removeClass('currentmenu');
        $('#home').addClass('currentmenu');
    },
    'tap #school': function (e) {
        e.preventDefault();
        console.log('tap school category');
        Session.set('showCategory', 'school');
        $('.navbuttons').removeClass('currentmenu');
        $('#school').addClass('currentmenu');
        Router.go('/');
    },
    'tap #work': function (e) {
        e.preventDefault();
        console.log('tap work category');
        Session.set('showCategory', 'work');
        $('.navbuttons').removeClass('currentmenu');
        $('#work').addClass('currentmenu');
        Router.go('/');
    },
    'tap #personal': function (e) {
        e.preventDefault();
        console.log('tap personal category');
        Session.set('showCategory', 'personal');
        $('.navbuttons').removeClass('currentmenu');
        $('#personal').addClass('currentmenu');
        Router.go('/');
    }
}
