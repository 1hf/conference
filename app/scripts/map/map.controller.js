(function () {
    'use strict';

    angular
            .module('conference.map')
            .controller('MapController', MapController);

    MapController.$inject = ['mapService', '$scope', '$ionicSlideBoxDelegate', '$interval', '$state'];

    /* @ngInject */
    function MapController(mapService, $scope, $ionicSlideBoxDelegate, $interval, $state) {
        var vm = angular.extend(this, {
            goMapDetails: goMapDetails
        });

        (function activate() {
            initMap()
        })();

        function initMap() {
            $scope.maps = ["1", "2", "3"];
            $scope.lengthG = $scope.maps.length;
            $scope.count = 1;
            $interval(function () {
                if ((parseInt($scope.count)) === (parseInt($scope.lengthG))) {
                    $scope.count = 1;
                    $ionicSlideBoxDelegate.slide(0);
                } else {
                    $ionicSlideBoxDelegate.next();
                    $scope.count++;
                }
            }, 4000);
        }

        function goMapDetails(level) {
            $state.go('app.map-details', {level: level});
        }

//			mapService.getMapDetails().then(function(data) {
//				vm.data = data;
//			})
    }
})();