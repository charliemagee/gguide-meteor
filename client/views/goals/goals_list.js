Template.goalsList.helpers({

	goals: function() {
		return Goals.find({category: (Session.get('showCategory'))}, {sort: {status: -1, createdDate: -1} });
	}
});

Template.goalsList.statusIs = function (status) {
	return this.status === status;
};
