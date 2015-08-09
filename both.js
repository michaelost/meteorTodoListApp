Todos = new Meteor.Collection('todos');
Todos.insert({
	name: "walk the dog",
	completed: false,
	createAt: new Date()
});