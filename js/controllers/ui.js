/**
 * Created by Jonathan on 10/5/2015.
 */

angular.module('uiApp', [])

    .controller('uiController', function($scope) {

        // set the default bootswatch name
        $scope.css = 'main';

        // create the list of bootswatches
        $scope.bootstraps = [
            { name: 'Dark', url: 'main_black' },
            { name: 'Red', url: 'main_red' },
        ];

    });