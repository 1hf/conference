(function () {
    'use strict';

    angular
            .module('conference.places', [
                'ionic',
                'ngCordova'
            ])
            .config(function ($stateProvider) {
                $stateProvider
                        .state('app.places', {
                            url: '/places',
                            templateUrl: 'scripts/places/places.html',
                            controller: 'PlacesController as vm'
                        })
                        .state('app.placesDetails', {
                            url: '/places-details/:place',
                            templateUrl: 'scripts/places/places-details.html',
                            controller: 'placesDetailsController as vm'
                        });
            });
})();