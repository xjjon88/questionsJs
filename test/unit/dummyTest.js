describe('Service unit testing', function() {
  beforeEach(module('myApp.services'));

  describe('Version testing', function() {
    it('current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});


/* 컨트롤러 단위 테스트 */
describe('controllers unit test', function(){
  beforeEach(module('myApp.services'));
  var scope;
  it('MyCtrl1 controller test1', inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    var ctrl = $controller('MyCtrl1', {
      $scope : scope
    });
    expect(scope.test1).toBe('EFG');
  }));
  it('MyCtrl2 controller test2', inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    var ctrl = $controller('MyCtrl2', {
      $scope : scope
    });
    expect(scope.test2()).toBe('Hello!');
  }));

  it('setFirstAndRestSentence Dummy', inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    var ctrl = $controller('MyCtrl1', {
      $scope : scope
    });
    var results = scope.getFirstAndRestSentence("Hello? This is Sung");
    expect(results[0]).toEqual('Hello?');
  }));

  it('setFirstAndRestSentence Dummy2', inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    var ctrl = $controller('MyCtrl1', {
      $scope : scope
    });
    var results = scope.getFirstAndRestSentence("..?");
    expect(results[0]).toEqual('.');
  }));

  it('setFirstAndRestSentence Dummy3', inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    var ctrl = $controller('MyCtrl1', {
      $scope : scope
    });
    var results = scope.getFirstAndRestSentence("aa");
    expect(results[0]).toEqual('aa');
  }));

  it('setFirstAndRestSentence Dummy4', inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    var ctrl = $controller('MyCtrl1', {
      $scope : scope
    });
    var results = scope.getFirstAndRestSentence("?.a");
    expect(results[0]).toEqual('?');
  }));



});
