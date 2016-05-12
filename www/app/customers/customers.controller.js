(function() {
    'use strict';

    angular.module('scale')
        .controller('customersController', customersController);

    function customersController($state, tostService, geoService, $ionicLoading, $ionicPopover, localStorageService, customersService, Configurations) {
        var self = this;
        self.mapEnable = false;
        self.userData = localStorageService.get('userData');
        mapLoader();
        self.Selectbutton=false;

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
                        icon: Configurations.userMarkerIcon
                    }
                };
                $ionicLoading.hide();
            }, function(error) {
                console.log(error);

            });
        }
        var temporaryMarker = -1;
        self.closeClick = function(marker, event, model) {
            if (temporaryMarker != model.id && temporaryMarker != -1) {
                self.randomMarkers[temporaryMarker].show = false;
            }
            temporaryMarker = model.id;
        }
        customersService.mapMarkers().then(function(response) {
            self.randomMarkers = response;
            if (angular.isDefined(localStorageService.get('Selection')) && localStorageService.get('Selection')!==false) {
                self.Selectbutton=true;
                var SelectedLan=localStorageService.get('Selection').latitude;
                var SelectedLong=localStorageService.get('Selection').longitude;
                var selectedObj = _.filter(response, function(item){ return item.latitude === SelectedLan && item.longitude === SelectedLong; });
                self.randomMarkers[selectedObj[0].id].show=true;
                self.mapEnable = true;
                mapLoader();  
                $ionicLoading.show();       
            }
        });
        self.checkIn = function() {
            mapLoader();
            self.mapEnable = true;
            $ionicLoading.show();
        };
        self.Select=function(){
            localStorageService.remove('Selection');
            $state.go("app.towkens");
        }
    }
})();