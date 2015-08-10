Todos = new Meteor.Collection('todos');

Lists = new Meteor.Collection('lists');
Todos.insert({
	name: "walk the dog",
	completed: false,
	createAt: new Date()
});

Router.route('/register',{
	template: 'register',
	name: 'register'
});
Router.route('/login',{
	template: 'login',
	name: 'login'
});

Router.route('/',{
	template: 'home',
	name: 'home'
});



Router.configure({
    layoutTemplate: 'main'
});

Router.route('/list/:_id',{
	template: 'listPage',
	name: 'listPage',
	data: function () {
		var currentList = this.params._id;
		return Lists.findOne({_id: currentList});
	},
	onBeforeAction: function () {
		var currentUser = Meteor.userId();
		if (currentUser) {
			this.next();
		} else {
			this.render('login');
		}
	},
	onRun: function () {
		console.log("you triggered onrun for listpage");
		this.next();
	},
	onRerun: function () {
		console.log("you triggered ;a;a;a");
		this.next();
	},
	onAfterAction : function () {
		console.log("you triggered onAfterAction");
	},
	onStop: function () {
		console.log(" you triggered onStop for listPage");
	}
});
