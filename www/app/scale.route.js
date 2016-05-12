(function() {
    'use strict';

    angular.module('scale')

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                cache: false,
                templateUrl: 'app/login/login.html',
                controller: 'loginController',
                controllerAs:'login'
            })
            .state('app', {
                url: '/app',
                cache: false,
                abstract: true,
                templateUrl: 'app/menu/menu.html',
                controller: 'menuController',
                controllerAs:'menu'
            })
            .state('app.customers', {
                url: '/customers',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/customers/customers.html',
                        controller: 'customersController',
                        controllerAs:'customers'
                    }
                }
            })
            .state('app.towkens', {
                url: '/towkens',
                cache: false,
                views: {
                    'menuContent': {
                    templateUrl: 'app/towkens/towkens.html',
                    controller: 'towkensController',
                    controllerAs:'towkens'
                    }
                }
            })
            .state('app.profile', {
                url: '/profile',
                cache: false,
                views: {
                    'menuContent': {
                    templateUrl: 'app/profile/profile.html',
                    controller: 'profileController',
                    controllerAs:'profile'
                    }
                }
            }) 
            .state('app.business', {
                url: '/business',
                cache: false,
                views: {
                    'menuContent': {
                    templateUrl: 'app/business/business.html',
                    controller: 'businessController',
                    controllerAs:'business'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');
    });
})();