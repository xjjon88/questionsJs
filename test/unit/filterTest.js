'use strict';

var questionList=[{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: 0,
  tags: "...",
  echo: 3,
  order: 3,
  pinned: false
},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: 0,
  tags: "...",
  echo: 2,
  order: 4,
  pinned: false
},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: 0,
  tags: "...",
  echo: 2,
  order: 5,
  pinned: false
},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: 0,
  tags: "...",
  echo: 2,
  order: 6,
  pinned: true
},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: new Date().getTime(), //new
  tags: "...",
  echo: 2,
  order: 0,
  pinned: false
},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: new Date().getTime()-1, //new
  tags: "...",
  echo: 0,
  order: 2,
  pinned: false
},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: new Date().getTime(), // latest
  tags: "...",
  echo: 0,
  order: 2,
  pinned: false
}];

describe('TodoCtrl', function() {
  beforeEach(module('todomvc'));

  describe('questionFilter Testing', function() {
    beforeEach(module(function($provide) {
      $provide.value('version', 'TEST_VER'); //TODO: what is this provide?
      console.log("provide.value: " + $provide.value);
    }));

    it('has a question filter', inject(function($filter) {
      expect($filter('questionFilter')).not.toBeNull();
    }));

    it('Filter order test', inject(function(questionFilterFilter) { // need to put Filter suffix
      var filteredList = questionFilterFilter(questionList, 100);
      /*for (var i in filteredList) {
        expect(""+filteredList[i].order).toEqual(i);
      }*/
      expect(filteredList[0].order).toEqual(6);
      expect(filteredList[1].order).toEqual(2);
      expect(filteredList[2].order).toEqual(2);
      expect(filteredList[3].order).toEqual(0);
      expect(filteredList[4].order).toEqual(3);
      expect(filteredList[5].order).toEqual(4);
      expect(filteredList[6].order).toEqual(5);
    }));

    it('Filter max test', inject(function(questionFilterFilter) { // need to put Filter suffix
      var filteredList = questionFilterFilter(questionList, 1);
      expect(filteredList.length).toEqual(6);
      /*for (var i in filteredList) {
        expect(""+filteredList[i].order).toEqual(i);
      }*/
      expect(filteredList[0].order).toEqual(6);
      expect(filteredList[1].order).toEqual(2);
      expect(filteredList[2].order).toEqual(2);
      expect(filteredList[3].order).toEqual(0);
      expect(filteredList[4].order).toEqual(3);
      expect(filteredList[5].order).toEqual(4);
    }));
  });
});
