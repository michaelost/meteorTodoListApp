Template.todos.helpers({
	'todo' : function () {
		return Todos.find();
	}
})

Template.addTodo.events({
	'submit form': function (event) {
		event.preventDefault();
		todoName = $('[name = todoName]').val();
		Todos.insert({
			name: todoName,
			completed: false,
			createAt: new Date()
		});
		$('[name = todoName]').val("");
	}
})

Template.todoItem.events({
	'click .delete-todo' : function (event) {
		event.preventDefault();
		var documentId = this._id;
		var confirm = window.confirm("remove this task");
		if(confirm) {
			Todos.remove({_id: documentId});
		}
		
	},
	'keyup [name=todoItem]': function (event) {
		if (event.which == 13 || event.which == 27) {
			$(event.target).blur();
		} else {
			var documentId = this._id;
			var todoItem = $(event.target).val();
			Todos.update({_id: documentId}, {$set:{name: todoItem}});
		}
		
	},
	'click [type=checkbox]': function (event) {
		var documentId = this._Id;
		var isCompleted = this.completed;
		if(isCompleted) {
			Todos.update({_id: documentId},{$set:{completed: false}});
			console.log("task marked as incomplete.");	
		} else {
			Todos.update({_id: documentId}, {$set:{completed: true}});
			console.log("task marged as completed.");
		}
	}

});

Template.todoItem.helpers({
	'checked': function () {
		var isCompleted = this.completed;
		if(isCompleted) {
			return "checked";
		} else {
			return "";
		}
	}
});


Template.todosCount.helpers({
	'totalTodos': function () {
		return Todos.find().count();
	},
	'completedTodos': function () {
		return Todos.find({completed: true}).count();
	}
})