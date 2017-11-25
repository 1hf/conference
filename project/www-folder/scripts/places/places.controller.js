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
            vm.placesList = [{place: 'DARJEELING', image: 'http://prakrithi.co/isacon2017/places-to-visit/darjeeling/darjeeling-main.png'},
                {place: 'DIGHA MANDARMANI', image: 'http://prakrithi.co/isacon2017/places-to-visit/dighaMandarmani/dighaMandarmani-main.png'},
                {place: 'SHANTINIKETAN', image: 'http://prakrithi.co/isacon2017/places-to-visit/shantiniketan/shantiniketan-main.png'},
                {place: 'SUNDERBANS', image: 'http://prakrithi.co/isacon2017/places-to-visit/sunderbans/sunderbans-main.png'},
                {place: 'CITY TOUR', image: 'http://prakrithi.co/isacon2017/places-to-visit/cityTour/cityTour-main.png'}
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