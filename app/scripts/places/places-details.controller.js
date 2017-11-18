(function () {
    'use strict';

    angular
            .module('conference.places')
            .controller('placesDetailsController', placesDetailsController);

    placesDetailsController.$inject = ['$state'];

    /* @ngInject */
    function placesDetailsController($state) {
        var place = $state.params.place;

        var vm = angular.extend(this, {
            title: null,
            showDarjeeling: false,
            showDighaMandiram: false,
            showShantiniketan: false,
            showSunderbans: false,
            showCityTour: false,
        });

        (function activate() {
            placeDetails(place);
        })();

        function placeDetails(place) {
            vm.title = place;
            if (place == 'DARJEELING') {
                vm.showDarjeeling = true;

            } else if (place == 'DIGHA MANDARMANI') {
                vm.showDighaMandarmani = true;

            } else if (place == 'SHANTINIKETAN') {
                vm.showShantiniketan = true;

            } else if (place == 'SUNDERBANS') {
                vm.showSunderbans = true;

            } else if (place == 'CITY TOUR') {
                vm.showCityTour = true;

            }
        }
    }
})();