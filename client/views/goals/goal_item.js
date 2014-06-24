Template.goalItem.helpers({
    ownGoal: function() {
        return this.userId == Meteor.userId();
    },
    domain: function() {
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    }


});

Template.goalAdd.events({
	'submit form': function(e) {
		e.preventDefault();

		var theCategory = $(e.target).find('[name=category]:checked').val();

		if ($(e.target).find('[name=icon]:checked').val()) {
			theIcon = $(e.target).find('[name=icon]:checked').val();
		} else {
			theIcon = "clipboard";
		}

		var goal = {
			category: $(e.target).find('[name=category]:checked').val(),
			goal: $(e.target).find('[name=goal]').val(),
			icon: theIcon
		}

		Meteor.call('goal', goal, function(error, id) {
			if (error) {
				// display the error to the user
				throwError(error.reason);
				if (error.error === 302)
					Router.go('goalPage', {_id: error.details})
			} else {

				Session.set('showCategory', theCategory);
				$('.navbuttons').removeClass('currentmenu');
				$('#' + theCategory ).addClass('currentmenu');
				Router.go('/');
			}
		});
	},

	'tap .canceladdgoal': function(e) {

		var theCategory = Session.get('showCategory');
		$('.navbuttons').removeClass('currentmenu');
		$('#' + theCategory ).addClass('currentmenu');
		Router.go('/');

	}
});

Template.goalItem.statusIs = function (status) {
    return this.status === status;
};

Template.goalItem.events({
    'tap .diditbutton': function(e) {
        e.preventDefault();

        var currentGoalId = this._id;
        var value = parseInt($('.gatherinfo').val(), 10);
		var d = new Date();
		var date = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        var status = 'complete';

        Goals.update(currentGoalId, {$push: {numbers: {date: date, value: value}}}, function(error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {
                console.log('updated goal with a value');
                console.log('updated goal with a date');
            }
        });

        Goals.update(currentGoalId, {$set: {status: status}}, function(error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {
                console.log('the status is now complete');
            }
        });

        $(".gatherinfo").val('');

        var from = this.emailSupervisor;
        var to = 'charlie@signaldesign.net';
        var goalAccomplished = this.goal;
        var author = this.author;

        Meteor.call('sendEmail',
            from,
            to,
            author + ' has accomplished a goal!',
            author + ' completed this goal-- "' + goalAccomplished + '" -- with this value: ' + value + '.' );

    },

    'tap .useagainbutton': function(e) {
        e.preventDefault();

        var currentGoalId = this._id;
        var status = 'inprogress';

        Goals.update(currentGoalId, {$set: {status: status}}, function(error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {
                console.log('the status is now inprogress');
            }
        });

    },

    'tap .goalleft': function(e) {

        if (!$(e.target).parent().parent().siblings('.goallower').hasClass('hidden')) {
            $(e.target).parent().parent().siblings('.goallower').addClass('hidden');
        } else {
            $(".goallower").addClass('hidden');
            $(e.target).parent().parent().siblings('.goallower').removeClass('hidden');
        }

    },

    'tap .chartbutton': function(e) {

        Session.set('goalValue', this.numbers);

    }
});

Template.goalEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentGoalId = this._id;

		var goalProperties = {
			category: $(e.target).find('[name=category]').val(),
			goal: $(e.target).find('[name=goal]').val(),
			icon: $(e.target).find('[name=icon]:checked').val()
		}

		Goals.update(currentGoalId, {$set: goalProperties}, function(error) {
			if (error) {
				// display the error to the user
				alert(error.reason);
			} else {
				Router.go('/');
			}
		});
	},

	'tap .delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this goal?")) {
			var currentGoalId = this._id;
			Goals.remove(currentGoalId);
			Router.go('/');
		}
	}
});