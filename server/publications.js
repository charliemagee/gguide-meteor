Meteor.publish("goals", function() {
	return Goals.find({userId: this.userId});
});