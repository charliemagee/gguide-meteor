Goals = new Meteor.Collection('goals');

Goals.allow({
    update: ownsDocument,
    remove: ownsDocument
});

Meteor.methods({
    goal: function(goalAttributes) {
        var user = Meteor.user();

        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to post new goals.");

        // ensure the goal has a category
        if (!goalAttributes.category)
            throw new Meteor.Error(422, 'Please select a category.');

        // ensure that there is a goal
        if (!goalAttributes.goal)
            throw new Meteor.Error(422, 'Please create a goal.');

        // ensure that they chose an icon
//        if (!goalAttributes.icon)
//            throw new Meteor.Error(422, 'You need an icon to go with your goal.');

        // pick out the whitelisted keys
        var goal = _.extend(_.pick(goalAttributes, 'category', 'goal', 'icon'), {
            userId: user._id,
            author: user.username,
            status: 'inprogress',
            value: [],
            date: [],
            createdDate: new Date().getTime(),
            emailSupervisor: 'charlie@signaldesign.net'
        });

        var goalId = Goals.insert(goal);

        return goalId;
    }
});
