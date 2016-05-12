(function() {
    'use strict';

    angular.module('scale')
            .controller('loginController', loginController);

    function loginController($state, tostService, loginFactory, $ionicLoading, localStorageService) {
        var self = this;
        self.userType = 'customers';
        self.signIn = function(){
            console.log(self.userType)
            if(angular.isDefined(self.email) && angular.isDefined(self.password)){
                 $ionicLoading.show();
                var query = loginFactory.save();
                query.$promise.then(function(data) {
                    tostService.notify('Welcome '+self.email, 'top');
                    localStorageService.set('userData', data);
                    localStorageService.set('usertype', self.userType);
                    $ionicLoading.hide();
                    $state.go('app.'+self.userType);
                });
               
            } else{
                tostService.notify('Please fill all details', 'top');
            }
        }
    }
})();