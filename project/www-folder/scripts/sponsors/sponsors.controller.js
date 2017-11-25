(function() {
	'use strict';

	angular
		.module('conference.sponsors')
		.controller('SponsorsController', SponsorsController);

	SponsorsController.$inject = ['$state', 'sponsorsService'];

	/* @ngInject */
	function SponsorsController($state, sponsorsService) {
		var vm = angular.extend(this, {
			sponsors: [],
			goToSponsorDetails: goToSponsorDetails,
			filterChanged: filterChanged
		});

		//*********************************************

		(function activate() {
			fetchSponsors()
		})();

		function fetchSponsors() {
			sponsorsService.fetchSponsors(vm.filter).then(function(items) {
				vm.sponsors = items;
			})
		}

		function goToSponsorDetails(id) {
			$state.go('app.sponsor-details', {
				id: id
			});
		}

		function filterChanged() {
			fetchSponsors();
		}

	}
})();
