Template.todos.helpers({
	'todo' : function () {
		return Todos.find();
	}
})

Template.addTodo.events({
	'submit form': function (event) {
		event.preventDefault();
		todoName = $('[name = todoName]').val();
		var currentList = this._id;

		Todos.insert({
			name: todoName,
			completed: false,
			createAt: new Date(),
			listId: currentList,
			createdBy : Meteor.userId()
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


Template.addList.events({
    'submit form': function(event){
      event.preventDefault();
      var listName = $('[name=listName]').val();
      var currentUser = Meteor.userId;
      Lists.insert({
          name: listName,
          createdBy: currentUser
      }, function (error, results) {
      	Router.go('listPage', {_id: results});
      });
      $('[name=listName]').val('');
    }
});



Template.lists.helpers({
    'list': function(){
        return Lists.find({createdBy: Meteor.userId()}, {sort: {name: 1}});
    }
});

Template.todos.helpers({
	'todo': function () {
		var currentList = this._id;
		return Todos.find({listId: this._id,createdBy: Meteor.userId()},{sort: {createAt: -1}});
	}
})


Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        }, function (error) {
        	if(error) {
        		console.log(error.reason);
        	} else {
        		var currentRoute = Router.current().route().getName();
        		if (currentRoute == "login") {
        			Router.go('home');	
        		}
        		
        	}
        });
        Router.go('/home')
    }
});

Template.navigation.events({
	'click .logout': function (event) {
		event.preventDefault();
		Meteor.logout();
		Router.go('login');
	}
});

Template.login.events({
	'submit form' : function (event) {
		event.preventDefault();
		var email = $("[name=email]").val();
		var password = $('[name=password]').val();
		Meteor.loginWithPassword(email,password, function (error) {
			if (error) {
				console.log(error.reason);
			} else {
				Router.go('home');
			}
		});

	}
});

Template.login.onRendered(function () {
	$('.login').validate({
		submitHandler: function (event) {
			var email = $('[name=email]').val();
			var password = $("[name=password]").val();
			Meteor.loginWithPassword(email,password, function () {
				if(error) {
					console.log(error.reason);
				} else {
					var currentRoute = Route.current().route().getName();
					if (currentRoute == "login" ) {
						Router.go("home");
					}
				}
			})
		}	
	});
});
Template.register.onRendered(function () {
	$('.login').validate({
		submitHandler: function (event) {
		var email = $("[name=email]").val();
		var password = $("[name=password]").val();
		Accounts.createUser({
			email: email,
			password: password,

		}, function (error) {
			if(error) {
				console.log(error.reason);
			} else {
				Router.go("home");
			}
		});
		}
	});
});



})$.validator.setDefault({
	rules: {
		email: {
			required: true,
			email: true
		},
		password: {
			required: true,
			minlenght: 6
		}
	},
	messages: {
		email: {
			required: "You must enter an email address",
			email: "You`ve entered an invalid email address"
		},
		password: {
			required: "You must enter a pssword",
			minlength: "Your password must be at least{0} characters"
		}
	}
});