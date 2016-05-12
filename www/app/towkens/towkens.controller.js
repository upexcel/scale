(function() {
    'use strict';

    angular.module('scale')
        .controller('towkensController', towkensController);

    function towkensController($scope, towkensFactory, $ionicLoading, $state, $ionicModal, localStorageService) {
        var self = this;
        self.towkensData = localStorageService.get("ApiData");
        self.selectedTowkens = function(towkenData) {
            self.modelData = towkenData;
            localStorageService.set('Selection', towkenData)
            $state.go("app.customers");
        }
    }
})();