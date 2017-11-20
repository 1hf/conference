(function () {
    'use strict';

    angular
            .module('conference.schedule')
            .controller('ScheduleDetailsController', ScheduleDetailsController);

    ScheduleDetailsController.$inject = ['scheduleService', 'ionicToast', '$stateParams', '$state', '$scope'];

    /* @ngInject */
    function ScheduleDetailsController(scheduleService, ionicToast, $stateParams, $state, $scope) {
        var vm = angular.extend(this, {
            session: null,
            doRefresh: doRefresh
//			,toggleFavorites: toggleFavorites
        });

        // ********************************************************************

        (function activate() {
            getSession();
        })();
        function getSession() {
            //vm.session = scheduleService.getSession();
            //vm.isInFavorites = scheduleService.isInFavorites(vm.session.$id);
            if ($stateParams.item) {
                vm.session = $stateParams.item;
                //alert(angular.toJson(vm.session));
            } else {
                $state.go('app.tabs.schedule');
            }

        }
        function doRefresh() {
            getSession();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        }

//		function toggleFavorites() {
//			vm.isInFavorites = !vm.isInFavorites;
//			if (vm.isInFavorites) {
//				scheduleService.toggleFavorites(vm.session.$id, true);
//				ionicToast.show('\'' + vm.session.title + '\' has been added to your Favorites', 'bottom', false, 2000);
//			} else {
//				scheduleService.toggleFavorites(vm.session.$id, false);
//				ionicToast.show('\'' + vm.session.title + '\' has been removed from your Favorites', 'bottom', false, 2000);
//			}
//		}
    }
})();