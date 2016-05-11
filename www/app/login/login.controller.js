(function() {
    'use strict';

    angular.module('scale')
            .controller('loginController', loginController);

    function loginController($state, tostService, loginFactory, $ionicLoading, localStorageService) {
        var self = this;
        self.userType = 'user';
        self.signIn = function(){
            if(self.email == "" && self.password == ""){
                tostService.notify('Please fill all details', 'top');
            } else{
                $ionicLoading.show();
                var query = loginFactory.save();
                query.$promise.then(function(data) {
                    tostService.notify('Welcome '+self.email, 'top');
                    localStorageService.set('userData', data);
                    $ionicLoading.hide();
                    $state.go('app.customers');
                });
            }
        }
    }
})();