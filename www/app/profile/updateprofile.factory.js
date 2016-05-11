(function() {
    'use strict';
    angular.module('scale')
            .factory('updateProfileFactory', updateProfileFactory);

    function updateProfileFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/login.json', {}, {});
    }
    ;
})();