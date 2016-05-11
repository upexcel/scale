(function() {
    'use strict';
    angular.module('scale')
            .factory('changeProfilePasswordFactory', changeProfilePasswordFactory);

    function changeProfilePasswordFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/login.json', {}, {});
    }
    ;
})();