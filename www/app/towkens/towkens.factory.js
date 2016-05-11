(function() {
    'use strict';
    angular.module('scale')
            .factory('towkensFactory', towkensFactory);

    function towkensFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/towkens.json', {}, {});
    }
    ;
})();