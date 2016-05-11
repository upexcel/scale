(function() {
    'use strict';

    angular.module('scale')
        .controller('profileController', profileController);

    function profileController($scope, $ionicModal, tostService, profileService, $ionicLoading) {
        var self = this;
        $ionicModal.fromTemplateUrl('app/profile/templates/updateprofile.html', function($ionicModal) {
            self.updateProfile = $ionicModal;
        }, {
            scope: $scope
        });
        $ionicModal.fromTemplateUrl('app/profile/templates/changepassword.html', function($ionicModal) {
            self.changepassword = $ionicModal;
        }, {
            scope: $scope
        });
        $ionicModal.fromTemplateUrl('app/profile/templates/usedtowkens.html', function($ionicModal) {
            self.usedTowkens = $ionicModal;
        }, {
            scope: $scope
        });
        $ionicModal.fromTemplateUrl('app/profile/templates/myreviews.html', function($ionicModal) {
            self.myReviews = $ionicModal;
        }, {
            scope: $scope
        });
        self.updateMyProfile = function(){
            if(self.newName == "" || self.newEmail == ""){
                tostService.notify('Please fill all details', 'top');
            } else{
                $ionicLoading.show();
                profileService.updateProfile(self.newName, self.newEmail).then(function(response){
                    self.newName == "";
                    self.newEmail == "";
                    tostService.notify('Profile Updated', 'top');
                    $ionicLoading.hide();
                    self.updateProfile.hide();
                });
            }
        };
        self.changeProfilePassword = function(){
            if(self.currentPassword == "" || self.newPassword == "" || self.verifyPassword == ""){
                tostService.notify('Please fill all details', 'top');
            } else if(self.newPassword !== self.verifyPassword){
                tostService.notify('New Password and Verify Password not matched', 'top');
            } else{
                $ionicLoading.show();
                profileService.changeProfilePassword(self.currentPassword, self.newPassword).then(function(response){
                    self.currentPassword == "";
                    self.newPassword == "";
                    self.verifyPassword == "";
                    tostService.notify('Password Changed', 'top');
                    $ionicLoading.hide();
                    self.changepassword.hide();
                })
            }
        };
    }
})();