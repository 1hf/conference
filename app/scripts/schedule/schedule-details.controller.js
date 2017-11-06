(function() {
	'use strict';

	angular
		.module('conference.schedule')
		.controller('ScheduleDetailsController', ScheduleDetailsController);

	ScheduleDetailsController.$inject = ['scheduleService', 'ionicToast', '$stateParams'];

	/* @ngInject */
	function ScheduleDetailsController(scheduleService, ionicToast, $stateParams) {
		var vm = angular.extend(this, {
			session: null,
			toggleFavorites: toggleFavorites
		});

		// ********************************************************************

		(function activate() {
			getSession();
		})();
console.log($stateParams);
		function getSession() {
			//vm.session = scheduleService.getSession();
			//vm.isInFavorites = scheduleService.isInFavorites(vm.session.$id);
                        vm.session = $stateParams.item;
                        console.log(angular.toJson(vm.session));
		}

		function toggleFavorites() {
			vm.isInFavorites = !vm.isInFavorites;
			if (vm.isInFavorites) {
				scheduleService.toggleFavorites(vm.session.$id, true);
				ionicToast.show('\'' + vm.session.title + '\' has been added to your Favorites', 'bottom', false, 2000);
			} else {
				scheduleService.toggleFavorites(vm.session.$id, false);
				ionicToast.show('\'' + vm.session.title + '\' has been removed from your Favorites', 'bottom', false, 2000);
			}
		}
	}
})();