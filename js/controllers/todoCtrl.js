/*global todomvc, angular, Firebase */
'use strict';

/**
* The main controller for the app. The controller:
* - retrieves and persists the model via the $firebaseArray service
* - exposes the model to the template and provides event handlers
*/
todomvc.controller('TodoCtrl',
['$scope', '$location', '$firebaseArray', '$sce', '$localStorage', '$window',
function ($scope, $location, $firebaseArray, $sce, $localStorage, $window) {
	// set local storage
	$scope.$storage = $localStorage;

	var scrollCountDelta = 10;
	$scope.maxQuestion = scrollCountDelta;

	/*
	$(window).scroll(function(){
	if($(window).scrollTop() > 0) {
	$("#btn_top").show();
} else {
$("#btn_top").hide();
}
});
*/
var splits = $location.path().trim().split("/");
var roomId = angular.lowercase(splits[1]);
if (!roomId || roomId.length === 0) {
	roomId = "all";
}


var firebaseURL = "https://xjquestions.firebaseio.com/";


$scope.roomId = roomId;
var url = firebaseURL + roomId + "/questions/";
var echoRef = new Firebase(url);
$scope.replyBox = {replyText : ""};
$scope.replying = {active : false};

	/** Sets roomTitle attribute for the root room object **/
	//var roomFB = new Firebase(firebaseURL + roomId);
	//roomFB.set({roomTitle : roomId});

	//var rQuery = roomFB.orderByKey();
	//$scope.rooms =  $firebaseArray(roomFB);


var query = echoRef.orderByChild("order");
// Should we limit?
//.limitToFirst(1000);
$scope.todos = $firebaseArray(query);


//$scope.input.wholeMsg = '';
$scope.editedTodo = null;

// pre-precessing for collection
$scope.$watchCollection('todos', function () {
	var total = 0;
	var remaining = 0;
	$scope.todos.forEach(function (todo) {
		// Skip invalid entries so they don't break the entire app.
		if (!todo || !todo.head ) {
			return;
		}

		total++;
		if (todo.completed === false) {
			remaining++;
		}

		// set time
		todo.dateString = new Date(todo.timestamp).toString();
		todo.tags = todo.wholeMsg.match(/#\w+/g);

		todo.trustedDesc = $sce.trustAsHtml(todo.linkedDesc);
	});

	$scope.totalCount = total;
	$scope.remainingCount = remaining;
	$scope.completedCount = total - remaining;
	$scope.allChecked = remaining === 0;
	$scope.absurl = $location.absUrl();
}, true);

// Get the first sentence and rest
$scope.getFirstAndRestSentence = function($string) {
	var head = $string;
	var desc = "";

	var separators = [". ", "? ", "! ", '\n'];

	var firstIndex = -1;
	for (var i in separators) {
		var index = $string.indexOf(separators[i]);
		if (index == -1) continue;
		if (firstIndex == -1) {firstIndex = index; continue;}
		if (firstIndex > index) {firstIndex = index;}
	}

	if (firstIndex !=-1) {
		head = $string.slice(0, firstIndex+1);
		desc = $string.slice(firstIndex+1);
	}
	return [head, desc];
};

	//
$scope.addTodo = function () {
	var newTodo = $scope.input.wholeMsg.trim();

	// No input, so just do nothing
	if (!newTodo.length) {
		return;
	}

	var firstAndLast = $scope.getFirstAndRestSentence(newTodo);
	var head = firstAndLast[0];
	var desc = firstAndLast[1];

	$scope.todos.$add({
		wholeMsg: newTodo,
		head: head,
		headLastChar: head.slice(-1),
		desc: desc,
		linkedDesc: Autolinker.link(desc, {newWindow: false, stripPrefix: false}),
		completed: false,
		timestamp: new Date().getTime(),
		tags: "...",
		echo: 0,
		necho: 0,
		order: 0,
		hidden: false,
		pinned: false,
		replies: []
	});
	// remove the posted question in the input
	$scope.input.wholeMsg = '';
};

$scope.editTodo = function (todo) {
	$scope.editedTodo = todo;
	$scope.originalTodo = angular.extend({}, $scope.editedTodo);
};

$scope.addReply = function(todo,response){
    //If empty reply, do nothing
    if (!response.length) {
		return;
	}

    $scope.editedTodo = todo;
    
    if(todo.replies == null){
    	todo.replies= [
        {head: response,
         timestamp: new Date().getTime().toString(),
         echo: 0,
         order: 0,
         hidden: false,
         highlighted: false
        }];}
    else{
    	todo.replies.push(
        {head: response,
         timestamp: new Date().getTime().toString(),
         echo: 0,
         order: 0,
         hidden: false,
         highlighted: false
        }
    );}
    $scope.todos.$save(todo);
    $scope.replyBox.replyText[todo.$id] = "";
    $scope.replying.active[todo.$id] = false;
};

//cancels reply, box closes and clears data
$scope.cancelReply = function(todo){
	$scope.replyBox.replyText[todo.$id] = "";
	$scope.replying.active[todo.$id] = false;
}

$scope.hideReply = function(todo, reply){
	$scope.editedTodo = todo;
	reply.hidden = !reply.hidden;
	$scope.todos.$save(todo);
};

//pin todo to top of question room
$scope.highlightReply = function(todo, reply){
	$scope.editedTodo = todo;
	reply.highlighted = !reply.highlighted;
	$scope.todos.$save(todo);
}

$scope.addEcho = function (todo) {



	$scope.editedTodo = todo;


 	if($scope.$storage[todo.$id]== "echoed"){                              // undoing the like
		todo.echo = todo.echo-1;
		todo.order = todo.order-1;

		$scope.$storage[todo.$id] = "default";
		$scope.todos.$save(todo);
	}

	else if($scope.$storage[todo.$id] == "nechoed"){
		todo.necho = todo.necho - 1;
		todo.echo = todo.echo + 1;
		todo.order = todo.order+2;

		$scope.$storage[todo.$id] = "echoed";
		$scope.todos.$save(todo);
	}
	else{
		todo.echo = todo.echo + 1;
		todo.order = todo.order+1;

	// Disable the button
		$scope.$storage[todo.$id] = "echoed";
		$scope.todos.$save(todo);
	}

};

$scope.minusEcho = function (todo) {

	$scope.editedTodo = todo;



	if($scope.$storage[todo.$id] == "nechoed"){                              // undoing the dislike
		todo.necho = todo.necho-1;
		todo.order = todo.order+1;
		
		$scope.$storage[todo.$id] = "default";
		$scope.todos.$save(todo);
	}

	else if($scope.$storage[todo.$id] == "echoed"){
		todo.echo = todo.echo - 1;
		todo.necho = todo.necho + 1;
		todo.order = todo.order-2;

		$scope.$storage[todo.$id] = "nechoed";
		$scope.todos.$save(todo);
	}
	else{
		todo.necho = todo.necho + 1;
		todo.order = todo.order-1;

    // Disable the button
    	$scope.$storage[todo.$id] = "nechoed";
		$scope.todos.$save(todo);
	}

};

$scope.buttonLiked = function (id){
	if ($scope.$storage[id] == "echoed")
		return true;
	return false;
}

$scope.buttonDisliked = function (id){
	if ($scope.$storage[id] == "nechoed")
		return true;
	return false;
}



$scope.doneEditing = function (todo) {
	$scope.editedTodo = null;
	var wholeMsg = todo.wholeMsg.trim();
	if (wholeMsg) {
		$scope.todos.$save(todo);
	} else {
		$scope.removeTodo(todo);
	}
};

$scope.revertEditing = function (todo) {
	todo.wholeMsg = $scope.originalTodo.wholeMsg;
	$scope.doneEditing(todo);
};

$scope.removeTodo = function (todo) {
	$scope.todos.$remove(todo);
};

$scope.hideTodo = function(todo){
	$scope.editedTodo = todo;
	todo.hidden = !todo.hidden;
	$scope.todos.$save(todo);
};

//pin todo to top of question room
$scope.pinTodo = function(todo){
	$scope.editedTodo = todo;
	todo.pinned = !todo.pinned;
	$scope.todos.$save(todo);
}

$scope.clearCompletedTodos = function () {
	$scope.todos.forEach(function (todo) {
		if (todo.completed) {
			$scope.removeTodo(todo);
		}
	});
};

$scope.toggleCompleted = function (todo) {
	todo.completed = !todo.completed;
	$scope.todos.$save(todo);
};

$scope.markAll = function (allCompleted) {
	$scope.todos.forEach(function (todo) {
		todo.completed = allCompleted;
		$scope.todos.$save(todo);
	});
};

$scope.FBLogin = function () {
	var ref = new Firebase(firebaseURL);
	ref.authWithOAuthPopup("facebook", function(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			$scope.$apply(function() {
				$scope.$authData = authData;
				$scope.isAdmin = true;
			});
			console.log("Authenticated successfully with payload:", authData);
		}
	});
};

$scope.FBLogout = function () {
	var ref = new Firebase(firebaseURL);
	ref.unauth();
	delete $scope.$authData;
	$scope.isAdmin = false;
};

$scope.increaseMax = function () {
	if ($scope.maxQuestion < $scope.totalCount) {
		$scope.maxQuestion+=scrollCountDelta;
	}
};

$scope.toTop =function toTop() {
	$window.scrollTo(0,0);
};

// Not sure what is this code. Todel
if ($location.path() === '') {
	$location.path('/');
}
$scope.location = $location;

// autoscroll
angular.element($window).bind("scroll", function() {
	if ($window.innerHeight + $window.scrollY >= $window.document.body.offsetHeight) {
		console.log('Hit the bottom2. innerHeight' +
		$window.innerHeight + "scrollY" +
		$window.scrollY + "offsetHeight" + $window.document.body.offsetHeight);

		// update the max value
		$scope.increaseMax();

		// force to update the view (html)
		$scope.$apply();
	}
});


	$scope.example = {
		text: '',
		word: /^\s*\w*\s*$/
	};

	$scope.join = function () {
		$window.location.href = 'question.html#/' + $scope.example.text;
	}

	/* Control of sorting and color scheme */
	$scope.predicate = '-order';

	$scope.changeOrder = function(predicate){
		$scope.predicate = predicate;
	};

	$scope.css = 'main';

	$scope.changeColor = function(css){
		$scope.css = css;
	};

	$("#menu-1 > .dropdown-menu li a").click ( function(){
		$(this).parents(".dropdown").find('.dropdown-toggle').html( "<strong>Color Scheme: </strong>" + $(this).text() + '<span class="caret" style="margin-left:7px"></span>' );
		$(this).parents(".dropdown").find('.dropdown-toggle').val( $(this).data('value') );
	});

	$("#menu-2 > .dropdown-menu li a").click ( function(){
		$(this).parents(".dropdown").find('.dropdown-toggle').html( "<strong>Sorting: </strong>" + $(this).text() + '<span class="caret" style="margin-left:7px"></span>' );
		$(this).parents(".dropdown").find('.dropdown-toggle').val( $(this).data('value') );
	});

}]);

