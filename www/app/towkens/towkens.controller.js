(function() {
    'use strict';

    angular.module('scale')
        .controller('towkensController', towkensController);

    function towkensController($scope, towkensFactory, $ionicLoading, $ionicModal) {
        var self = this;
        self.towkensSpinner = true;
        var query = towkensFactory.query();
        query.$promise.then(function(data) {
            self.towkensSpinner = false;
            self.towkensData = data;
        });
        $ionicModal.fromTemplateUrl('app/towkens/templates/towken.html', function($ionicModal) {
            self.towkensModel = $ionicModal;
        }, {
            scope: $scope
        });
        self.selectedTowkens = function(towkenData){
            self.modelData = towkenData;
            self.towkensModel.show();
        }
    }
})();