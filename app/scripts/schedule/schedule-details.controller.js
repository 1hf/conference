(function() {
	'use strict';

	angular
		.module('conference.schedule')
		.controller('ScheduleDetailsController', ScheduleDetailsController);

	ScheduleDetailsController.$inject = ['scheduleService', 'ionicToast'];

	/* @ngInject */
	function ScheduleDetailsController(scheduleService, ionicToast) {
		var vm = angular.extend(this, {
			session: null,
			toggleFavorites: toggleFavorites
		});

		// ********************************************************************

		(function activate() {
			getSession();
		})();

		function getSession() {
			vm.session = scheduleService.getSession();
			vm.isInFavorites = scheduleService.isInFavorites(vm.session.$id);
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