(function() {
    'use strict';

    angular.module('scale')
        .controller('menuController', menuController);

    function menuController($state, $ionicPlatform, $localStorage, $ionicHistory, tostService, $timeout, $rootScope, $ionicSideMenuDelegate) {
        var self = this;
        self.mapTab = true;
        self.dataTab = false;
        self.menutabs = true;
        self.logout=function(){
            $localStorage.$reset();
        }
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            if($state.current.name == 'app.customers' || $state.current.name == 'app.towkens'){
                self.menutabs = true;
            } else{
                self.menutabs = false;
            }
            if($state.current.name == 'app.customers'){
                self.mapTab = true;
                self.dataTab = false;
            } else{
                self.dataTab = true;
                self.mapTab = false;
            }
         });
        var count = 0;
        $ionicPlatform.registerBackButtonAction(function() {
            var view = $ionicHistory.currentView();
            if (view.stateId == 'login' && count == 0 || view.stateId == 'app.customers' && count == 0) {
                tostService.notify('Press Back Again To Exit App', 'top');
                count++;
                $timeout(function() {
                    count = 0;
                }, 3000);
            } else if (view.stateId == 'login' && count == 1 || view.stateId == 'app.customers' && count == 1) {
                navigator.app.exitApp();
                count = 0;
            } else {
                $ionicHistory.goBack();
                count = 0;
            }
        }, 100);
    }
})();