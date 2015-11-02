/*global todomvc, angular, Firebase */
'use strict';

/**
* The hashFilter
* Reformat and don't repeat hashs 
*
*/
todomvc.filter('hashFilter', function () {
  return function (input) {
    var hashtags = [];

    angular.forEach(input, function (tag) {
      var newtag = tag.slice(1);
      var unique = false;
      
      if(hashtags.indexOf(newtag)==-1)
        unique = true;

      if(unique == true)
        hashtags.push(newtag);
    });

    // Combined list
    return hashtags;
  };
});
