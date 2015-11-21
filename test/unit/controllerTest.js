'use strict';

describe('sorting the list of users', function() {
  it('sorts in descending order by default', function() {
    var users = ['jack', 'igor', 'jeff'];
    //    var sorted = sortUsers(users);
    //    expect(sorted).toEqual(['jeff', 'jack', 'igor']);
  });
});

describe('TodoCtrl', function() {
  beforeEach(module('todomvc'));
  // variables for injection
  var compile;
  var controller;
  var scope;
  var location;
  var firebaseArray;
  var sce;
  var localStorage;
  var window;

  // Injecting variables
  // http://stackoverflow.com/questions/13664144/how-to-unit-test-angularjs-controller-with-location-service
  beforeEach(inject(function($location,
    $rootScope,
    $controller,
    $firebaseArray,
    $localStorage,
    $sce, $compile,
    $window){
      // The injector unwraps the underscores (_) from around the parameter names when matching

      scope = $rootScope.$new();

      location = $location;
      controller = $controller;
      firebaseArray = $firebaseArray;
      sce = $sce;
      localStorage = $localStorage;
      window = $window;
      compile = $compile;

      var fixture = '<textarea type="text" id="new-todo" class="form-control" placeholder="Search or Post Question" ng-model="input.wholeMsg" autofocus></textarea>';

      window.document.body.insertAdjacentHTML('afterbegin', fixture);

    }));


    describe('TodoCtrl Testing', function() {
      it('setFirstAndRestSentence', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope
        });

        var testInputs = [
          {str:"Hello? This is Sung", exp: "Hello?"},
          {str:"Hello.co? This is Sung", exp: "Hello.co?"},
          {str:"Hello.co This is Sung", exp: "Hello.co This is Sung"},
          {str:"Hello.co \nThis is Sung", exp: "Hello.co \n"},
          {str:"Hello?? This is Sung", exp: "Hello??"},
          {str:"! . Hello! co this is Kaichen", exp: "!"},
          {str:"Hello. co this is Kaichen", exp: "Hello."},
          {str:"Hello. co this? is Kaichen", exp: "Hello."},
        ];

        for (var i in testInputs) {
          var results = scope.getFirstAndRestSentence(testInputs[i].str);
          expect(results[0]).toEqual(testInputs[i].exp);
        }
      });

      /*it('loginFb test', function(){
        var cntrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        var firebaseMock = new Firebase("mock://xjquestions.firebaseio.com/");
        var query = firebaseMock.orderByChild("order");


        scope.todos = firebaseArray(query);

        scope.ref = firebaseMock

        scope.FBLogin();

        spyOn(scope, 'FBLogin');

        expect(scope.isAdmin).toBe(false);

      });*/

      it('logoutFb test', function(){
        var cntrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });



        scope.FBLogout();
        expect(scope.isAdmin).toBe(false);

      });

      it('increaseMax test, max < totalCount', function(){
        var cntrl = controller('TodoCtrl', {
          $scope: scope
        });

        var mQ = scope.maxQuestion;
        scope.totalCount = mQ + 1;
        scope.increaseMax();
        expect(scope.maxQuestion).toEqual(mQ + 10);

      });

      it('increaseMax test, max > totalCount', function(){
        var cntrl = controller('TodoCtrl', {
          $scope: scope
        });

        var mQ = scope.maxQuestion;
        scope.totalCount = mQ - 1;
        scope.increaseMax();
        expect(scope.maxQuestion).toEqual(mQ);


      });

      it('doneEditing test', function(){



      });


      it('RoomId', function() {
        location.path('/new/path');

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location
        });

        expect(scope.roomId).toBe("new");
      });

      it('editTodo test', function() {
        location.path('/new/path');

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });
        var todo;
        scope.editTodo(todo);

      });

      it('toTop Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.toTop();
        expect(window.scrollX).toBe(0);
        expect(window.scrollY).toBe(0);
      });



      it('removeTodo test', function(){
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.removeTodo(null);


      });


      //it('clearCompletedTodos', function(){

        /*
        var firebaseMock = new Firebase("mock://xjquestions.firebaseio.com/");
        var query = firebaseMock.orderByChild("order");


        scope.todos = firebaseArray(firebaseMock);


        window.document.getElementById('new-todo').value = 'get hard';
        //expect(window.document.getElementById('new-todo').value).toBe('get hard');
        scope.input = window.document.getElementById('new-todo');
        scope.input.wholeMsg = window.document.getElementById('new-todo').value;

        //expect(scope.input.wholeMsg).toBe('get hard');
        scope.addTodo();

        //scope.todos = firebaseArray;
        expect(firebaseArray.length).toBe(3);
        expect(firebaseArray).toBe(4);
        expect(scope.todos.length).toBe(3);


        spyOn(scope, 'clearCompletedTodos');
        scope.clearCompletedTodos();

        //expect(scope.todos.length).toBe(3);

        */

        /*var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $controller: controller,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window,
        });

        scope.todos.push( {
          wholeMsg: "newTodo",
          head: "head",
          headLastChar: "?",
          desc: "desc",
          linkedDesc: 'gethard01',
          completed: true,
          timestamp: 0,
          tags: "...",
          echo: 0,
          order: 1
        });

        scope.todos.push( {
          wholeMsg: "gg",
          head: "head",
          headLastChar: "?",
          desc: "desc",
          linkedDesc: 'gethard2',
          completed: false,
          timestamp: 0,
          tags: "",
          echo: 3,
          order: 0
        });

        scope.clearCompletedTodos();


      });*/


      it('addTodo Testing', function(){
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        var firebaseMock = new Firebase("mock://xjquestions.firebaseio.com/");
        var query = firebaseMock.orderByChild("order");

        scope.todos = firebaseArray(query);

        window.document.getElementById('new-todo').value = 'get hard';
        //expect(window.document.getElementById('new-todo').value).toBe('get hard');
        scope.input = window.document.getElementById('new-todo');
        scope.input.wholeMsg = window.document.getElementById('new-todo').value;

        //expect(scope.input.wholeMsg).toBe('get hard');
        scope.addTodo();

        //expect(firebaseArray.length).toBe(3);

        window.document.getElementById('new-todo').value = '';
        scope.input = window.document.getElementById('new-todo');
        scope.input.wholeMsg = window.document.getElementById('new-todo').value;
        scope.addTodo();


      });

      it('doneEditing test', function(){

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $window: window
        });

        window.document.getElementById('new-todo').value = 'get hard';
        scope.input = window.document.getElementById('new-todo');
        scope.input.wholeMsg = window.document.getElementById('new-todo').value;


        var tempTodo = scope.input.wholeMsg.trim();
        var firstAndLast = scope.getFirstAndRestSentence(tempTodo);
        var head = firstAndLast[0];
        var desc = firstAndLast[1];

        var todo = {wholeMsg: tempTodo,
          head: head,
          headLastChar: head.slice(-1),
          desc: desc,
          linkedDesc: Autolinker.link(desc, {newWindow: false, stripPrefix: false}),
          completed: false,
          timestamp: new Date().getTime(),
          tags: "...",
          echo: 0,
          order: 0
        };

        scope.doneEditing(todo);

        window.document.getElementById('new-todo').value = '';
        scope.input = window.document.getElementById('new-todo');
        scope.input.wholeMsg = window.document.getElementById('new-todo').value;


        var tempTodo = scope.input.wholeMsg.trim();
        var firstAndLast = scope.getFirstAndRestSentence(tempTodo);
        var head = firstAndLast[0];
        var desc = firstAndLast[1];

        var todo = {wholeMsg: tempTodo,
          head: head,
          headLastChar: head.slice(-1),
          desc: desc,
          linkedDesc: Autolinker.link(desc, {newWindow: false, stripPrefix: false}),
          completed: false,
          timestamp: new Date().getTime(),
          tags: "...",
          echo: 0,
          order: 0
        };

        scope.doneEditing(todo);

      });

      it('edit test', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $controller: controller,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window,
        });
        var TL=[{
          wholeMsg: "gethare",
          head: "gethare",
          headLastChar: "?",
          desc: "desc",
          linkedDesc: "linkedDesc",
          completed: false,
          timestamp: 0,
          tags: "...",
          echo: 0,
          order: 3
        },{
          wholeMsg: "gethare",
          head: "gethare",
          headLastChar: "?",
          desc: "desc",
          linkedDesc: "linkedDesc",
          completed: false,
          timestamp: 0,
          tags: "...",
          echo: 0,
          order: 4
        },{
          wholeMsg: "gethare",
          head: "gethare",
          headLastChar: "?",
          desc: "desc",
          linkedDesc: "linkedDesc",
          completed: false,
          timestamp: 0,
          tags: "...",
          echo: 0,
          order: 5
        }];

        scope.doneEditing(TL[0]);
        scope.editTodo(TL[2]);
        scope.revertEditing(TL[2]);
      });


      it('watch collection test', function(){

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $controller: controller,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window,
        });


        scope.todos.push( {
          wholeMsg: "gethard0000",
          head: "gethard0000",
          headLastChar: "0",
          desc: "desc",
          linkedDesc: 'gethard01',
          completed: true,
          timestamp: 0,
          tags: "...",
          echo: 0,
          order: 1
        });

        scope.todos.push( {
          wholeMsg: "gg",
          head: "head",
          headLastChar: "g",
          desc: "desc",
          linkedDesc: 'gethard2',
          completed: false,
          timestamp: 0,
          tags: "",
          echo: 1,
          order: 0
        });

        scope.$digest();

        scope.$watchCollection('todos', function () {
          var total = 0;
          var remaining = 0;
          scope.todos.forEach(function (todo) {
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

          scope.totalCount = total;
          scope.remainingCount = remaining;
          scope.completedCount = total - remaining;
          scope.allChecked = remaining === 0;
          scope.absurl = $location.absUrl();
        }, true);
      });



      it('changeOrder test', function(){
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        expect(scope.predicate).toBe("-order");

        scope.changeOrder("-echo");
        expect(scope.predicate).toBe("-echo");

        scope.changeOrder("-necho");
        expect(scope.predicate).toBe("-necho");

        scope.changeOrder("-timestamp");
        expect(scope.predicate).toBe("-timestamp");

        scope.changeOrder("timestamp");
        expect(scope.predicate).toBe("timestamp");

        scope.changeOrder("-order");
        expect(scope.predicate).toBe("-order");
      });

      it('changeColor test', function(){
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        expect(scope.css).toBe("main");

        scope.changeColor("main_black");
        expect(scope.css).toBe("main_black");

        scope.changeColor("main_red");
        expect(scope.css).toBe("main_red");

        scope.changeColor("main");
        expect(scope.css).toBe("main");
      });

      it('addEcho test', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var todo = {
          wholeMsg: "",
          echo: 0,
          necho: 0,
          order: 0
        };

        scope.addEcho(todo);
        expect(todo.echo).toBe(1);
        expect(todo.order).toBe(1);
        expect(scope.$storage[todo.$id]).toBe("echoed");

        scope.addEcho(todo);
        expect(todo.echo).toBe(0);
        expect(todo.order).toBe(0);
        expect(scope.$storage[todo.$id]).toBe("default");

        scope.minusEcho(todo);
        expect(todo.necho).toBe(1);
        expect(todo.order).toBe(-1);
        expect(scope.$storage[todo.$id]).toBe("nechoed");
        scope.addEcho(todo);
        expect(todo.echo).toBe(1);
        expect(todo.necho).toBe(0);
        expect(todo.order).toBe(1);
        expect(scope.$storage[todo.$id]).toBe("echoed");
      });

      it('minusEcho test', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var todo = {
          wholeMsg: "",
          echo: 0,
          necho: 0,
          order: 0
        };

        scope.minusEcho(todo);
        expect(todo.necho).toBe(1);
        expect(todo.order).toBe(-1);
        expect(scope.$storage[todo.$id]).toBe("nechoed");

        scope.minusEcho(todo);
        expect(todo.necho).toBe(0);
        expect(todo.order).toBe(0);
        expect(scope.$storage[todo.$id]).toBe("default");

        scope.addEcho(todo);
        expect(todo.echo).toBe(1);
        expect(todo.order).toBe(1);
        expect(scope.$storage[todo.$id]).toBe("echoed");
        scope.minusEcho(todo);
        expect(todo.echo).toBe(0);
        expect(todo.necho).toBe(1);
        expect(todo.order).toBe(-1);
        expect(scope.$storage[todo.$id]).toBe("nechoed");
      });

      it('buttonLiked test', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var todo = {
          wholeMsg: "",
          echo: 0,
          necho: 0,
          order: 0
        };

        scope.addEcho(todo);
        expect( scope.buttonLiked(todo.$id) ).toBe(true);
        scope.addEcho(todo);
        expect( scope.buttonLiked(todo.$id) ).toBe(false);
      });

      it('buttonDisliked test', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var todo = {
          wholeMsg: "",
          echo: 0,
          necho: 0,
          order: 0
        };

        scope.minusEcho(todo);
        expect( scope.buttonDisliked(todo.$id) ).toBe(true);
        scope.minusEcho(todo);
        expect( scope.buttonDisliked(todo.$id) ).toBe(false);
      });

      it('hideTodo test', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var todo = {
          wholeMsg: "",
          hidden: false
        };

        scope.hideTodo(todo);
        expect(todo.hidden).toBe(true);
      });

      it('pinTodo test', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var todo = {
          wholeMsg: "",
          pinned: false
        };

        scope.pinTodo(todo);
        expect(todo.pinned).toBe(true);
      });

      it('toggleCompleted test', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var todo = {
          wholeMsg: "",
          completed: false
        };

        scope.toggleCompleted(todo);
        expect(todo.completed).toBe(true);
      });

      it('isWordFilterOn test', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        expect(scope.WordfilterFlag).toBe('on');
        expect(scope.isWordFilterOn()).toBe(true);
        scope.WordfilterFlag = 'off';
        expect(scope.WordfilterFlag).toBe('off');
        expect(scope.isWordFilterOn()).toBe(false);
      });

      it('changeFilterFlag test', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        expect(scope.WordfilterFlag).toBe('on');
        scope.changeFilterFlag('off');
        expect(scope.WordfilterFlag).toBe('off');
      });














    });
  });
