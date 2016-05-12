(function () {
   
   angular.module('scale')
      .factory('customersService', customersService);
   function customersService($q, towkensFactory, Configurations, localStorageService) {
    var service = {};
    service.mapMarkers = function(name, email){
      var q = $q.defer();
      var query = towkensFactory.query();
      query.$promise.then(function(data) {
        localStorageService.set("ApiData",data);
        var latLongArray = [];
        for(var i = 0; i < data.length; i++){
          var newData = {};
          newData.latitude = data[i].latitude;
          newData.longitude = data[i].longitude;
          newData.mile = data[i].mile;
          newData.business_name = data[i].business_name;
          newData.address = data[i].address;
          newData.discount = data[i].discount;
          newData.id = i;
          newData.icon = Configurations.markerIcon;
          latLongArray.push(newData);
        }
        q.resolve(latLongArray); 
      });
      return q.promise;
    };
    return service;
};
})();