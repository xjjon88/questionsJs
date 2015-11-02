/*global todomvc, angular, Firebase */
'use strict';

/**
* The questionFilter
* Show the new questions on the top and show only max questions 
*
*/
todomvc.filter('questionFilter', function () {
  return function (input, max) {
    var sorted = [];
    var newQuestions = [];
    var pinQuestions = [];
    var sortedCount = 0;

    angular.forEach(input, function (todo) {
      if (todo.pinned == true)
        pinQuestions.push(todo);
      else if (todo.timestamp > new Date().getTime() - 180000) { // 3min
        todo.newQuestion = true;
        newQuestions.push(todo);
      } else if (sortedCount++<=max){  // show top n only.
        todo.newQuestion = false;
        sorted.push(todo);
      }

      // sorting new questions based on the time if order is the same.
      // Newer ones are on the top
      newQuestions.sort(function(a, b) {
        if (a.order == b.order) {
          return b.timestamp - a.timestamp;
        }
        return b.order - a.order;
      });
    });

    // Combined list
    return pinQuestions.concat(newQuestions.concat(sorted));
  };
});
