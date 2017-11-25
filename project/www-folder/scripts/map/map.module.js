(function () {
    'use strict';

    angular
            .module('conference.map', [
                'ionic'
            ])
            .config(function ($stateProvider) {
                $stateProvider
                        .state('app.tabs.map', {
                            url: '/map',
                            views: {
                                'map-tab': {
                                    templateUrl: 'scripts/map/map.html',
                                    controller: 'MapController as vm'
                                }
                            }
                        })
                        .state('app.map-details', {
                            url: '/map-details/:level',
                            templateUrl: 'scripts/map/map-details.html',
                            controller: 'MapDetailsController as vm'
                        });
            });
})();