(function () {
    'use strict';

    angular
            .module('conference.map')
            .controller('MapDetailsController', MapDetailsController);

    MapDetailsController.$inject = ['mapService', '$scope', '$ionicSlideBoxDelegate', '$interval', '$stateParams', '$state'];

    /* @ngInject */
    function MapDetailsController(mapService, $scope, $ionicSlideBoxDelegate, $interval, $stateParams, $state) {
        var vm = angular.extend(this, {
            level: $stateParams.level,
            goBack: goBack
        });

        (function activate() {
            initMapDetails();
        })();

        function initMapDetails() {
            if (vm.level == 'Level 0') {
                vm.src = 'http://prakrithi.co/isacon2017/HIDCO-GROUND-FLOOR-1.jpg';

            } else if (vm.level == 'Level 2') {
                vm.src = 'http://prakrithi.co/isacon2017/HIDCO-1ST-FLOOR-1.jpg';

            } else if (vm.level == 'Level 4') {
                vm.src = 'http://prakrithi.co/isacon2017/HIDCO-2ND-FLOOR-1.jpg';
            }
        }

        function goBack() {
            $state.go('app.tabs.map');
        }
    }
})();