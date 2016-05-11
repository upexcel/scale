(function() {
    'use strict';

angular.module('scale')

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false).text(' ');
    $ionicConfigProvider.views.transition('none');
});

})();