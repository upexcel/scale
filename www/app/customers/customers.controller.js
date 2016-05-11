(function() {
    'use strict';

    angular.module('scale')
        .controller('customersController', customersController);

    function customersController($state, tostService, geoService, $ionicLoading, $ionicPopover, localStorageService, customersService, Configurations) {
        var self = this;
        self.userData = localStorageService.get('userData');
        self.mapEnable = false;
        mapLoader();
        function mapLoader(){
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
                    options:{
                        icon:Configurations.userMarkerIcon
                    }
                };
            }, function(error){
                console.log(error);
            });
        }
        var temporaryMarker = -1;
        self.closeClick = function(marker,event,model){
        if(temporaryMarker!=model.id && temporaryMarker!=-1)
        {
             self.randomMarkers[temporaryMarker].show=false;
        }
          temporaryMarker = model.id;
        }
        customersService.mapMarkers().then(function(response){
            self.randomMarkers = response;
        });
        self.checkIn = function() {
            mapLoader();
            self.mapEnable = true;
        };
    }
})();