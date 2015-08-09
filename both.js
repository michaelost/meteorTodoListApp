Todos = new Meteor.Collection('todos');
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