'use strict'

describe('directive tests', function(){
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
    beforeEach(inject(function($compile,
                               $location,
                               $rootScope,
                               $controller,
                               $firebaseArray,
                               $localStorage,
                               $sce,
                               $window){
        // The injector unwraps the underscores (_) from around the parameter names when matching

        scope = $rootScope.$new();

        compile = $compile;
        location = $location;
        controller = $controller;
        firebaseArray = $firebaseArray;
        sce = $sce;
        localStorage = $localStorage;
        window = $window;



    }));


    it('todoFocus test', function(){
        var ctrl = controller('TodoCtrl', {
            $scope: scope,
            $window: window,
            $compile: compile,
        });


        //var element = '<span ng-bind="todoFocus" newVal = false></span> ';
        var element = '<todoFocus="true"></todoFocus> ';

        element = compile(element)(scope);
        scope.$digest();

    });

    function triggerEscKeyDown() {
        /**
         * Create KeyboardEvent
         */
        var e = new window.KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            shiftKey: true
        });

        /**
         * Assing 27 as keyCode
         */
        delete e.keyCode;
        Object.defineProperty(e, 'keyCode', {'value': 27});

        window.dispatchEvent(e);
    }

    describe('dirs test', function () {

        var scope, compile, browser;

        beforeEach(inject(function ($rootScope, $compile, $browser) {
            scope = $rootScope.$new();
            compile = $compile;
            browser = $browser;
        }));

        it('dir escape test', function () {
            var tag = angular.element('<input todo-blur="blur">');
            //var element = '<span ng-bind="todoFocus" newVal = false></span> ';
            var element = compile(tag)(scope);

            element.escape= jasmine.createSpy("escape");

            element.triggerHandler({type: 'keydown', keyCode: 27});



            scope.$digest();
            element.triggerHandler({type: 'keydown', keyCode: 67});

            scope.$digest();



        });
        it('dir focus test', function () {
            var tag = angular.element('<input todo-focus="focus">');
            //var element = '<span ng-bind="todoFocus" newVal = false></span> ';
            var element = compile(tag)(scope);

            scope.$apply(function () {
                scope.focus = true;
            });
            scope.$apply(function () {
                scope.focus = false;
            });


            scope.$digest();
        });
    });

    it('todoEscape test', function(){
        var ctrl = controller('TodoCtrl', {
            $scope: scope,
            $window: window,
            $compile: compile,
        });
        var element = '<todoBlur></todoBlur> ';
        element = compile(element)(scope);

        //var element = '<span ng-bind="todoFocus" newVal = false></span> ';

        var e = new window.KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            shiftKey: true
        });

        /**
         * Assing 27 as keyCode
         */
        delete e.keyCode;
        Object.defineProperty(e, 'keyCode', {'value': 27});


        var press = jQuery.Event("keydown");
        press.ctrlKey = false;
        press.which = 27;



        scope.document = window;
        scope.document.dispatchEvent(e);

        //window.document.dispatchEvent(e);

        scope.$digest();



    });






});