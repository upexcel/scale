(function() {
    'use strict';

    angular.module('scale')
        .controller('businessController', businessController);

    function businessController($state, tostService, geoService,$scope,$interval, $ionicLoading, $ionicModal, $ionicPopover, localStorageService, customersService, Configurations) {
        var self = this;
        self.mapEnable = false;
        self.userData = localStorageService.get('userData');
        mapLoader();
        self.Selectbutton=false;
         $ionicModal.fromTemplateUrl('app/business/templates/createtowkens.html', function($ionicModal) {
            self.CreateTowken = $ionicModal;
        }, {
            scope: $scope
        });
        function mapLoader() {
            geoService.nearBy().then(function(position) {
                self.map = {
                    center: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    zoom: 14
                };
                self.marker = {
                    id: 0,
                    coords: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    options: {
                        icon: Configurations.HomeMarkerIcon
                    }
                };
                $ionicLoading.hide();
            }, function(error) {
                console.log(error);

            });
        }
        var timeDuration=[];
        for(var i=1; i<=12; i++){
            timeDuration.push(i.toString()+":"+"00");
            if(i!==12)
            timeDuration.push(i+":"+30);
        }
        self.timeDuration=timeDuration;
      self.later=function(){
        self.laterselected=true;
      }
    }
})();