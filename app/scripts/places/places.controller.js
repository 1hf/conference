(function () {
    'use strict';

    angular
            .module('conference.places')
            .controller('PlacesController', PlacesController);

    PlacesController.$inject = ['$state', 'placesService'];

    /* @ngInject */
    function PlacesController($state, placesService) {

        var vm = angular.extend(this, {
            placesList: [],
            gotoPlacesDetails: gotoPlacesDetails
        });

        (function activate() {
            getDetails();
        })();

        function getDetails() {
            vm.placesList = [{place: 'DARJEELING', image: 'images/places-to-visit/darjeeling/darjeeling-main.png'},
                {place: 'DIGHA MANDARMANI', image: 'images/places-to-visit/dighaMandarmani/dighaMandarmani-main.png'},
                {place: 'SHANTINIKETAN', image: 'images/places-to-visit/shantiniketan/shantiniketan-main.png'},
                {place: 'SUNDERBANS', image: 'images/places-to-visit/sunderbans/sunderbans-main.png'},
                {place: 'CITY TOUR', image: 'images/places-to-visit/cityTour/cityTour-main.png'}
            ]
        }

        function gotoPlacesDetails(value) {
            $state.go('app.placesDetails', {place: value});
        }

//        $ionicModal.fromTemplateUrl('templates/modal.html', {
//            scope: $scope
//        }).then(function (modal) {
//            $scope.modal = modal;
//        });
//        $scope.openModal = function () {
//            $scope.modal.show()
//        };
    }
})();