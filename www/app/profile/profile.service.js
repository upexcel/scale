(function () {
   
   angular.module('scale')
      .factory('profileService', profileService);
   function profileService(updateProfileFactory, $q, changeProfilePasswordFactory) {
    var service = {};
    service.updateProfile = function(name, email){
      var q = $q.defer();
      var query = updateProfileFactory.save();
      query.$promise.then(function(data) {
        q.resolve(data); 
      });
      return q.promise;
    };
    service.changeProfilePassword = function(oldPassword, newPassword){
      var q = $q.defer();
      var query = changeProfilePasswordFactory.save();
      query.$promise.then(function(data) {
        q.resolve(data); 
      });
      return q.promise;
    };
    return service;
};
})();