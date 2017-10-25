(function() {
	'use strict';

	angular
		.module('conference.sponsors')
		.factory('sponsorsService', sponsorsService);

	sponsorsService.$inject = ['dataService', '$q', '_'];

	/* @ngInject */
	function sponsorsService(dataService, $q, _) {
		var sponsors = null;
		var service = {
			fetchSponsors: fetchSponsors,
			getSponsor: getSponsor
		};
		return service;

		function getSponsor(sponsorId) {
			return dataService.getSponsor(sponsorId);
		}

		function getSponsors() {
			if (!sponsors) {
				return dataService.getSponsors();
			}
			return $q.when(sponsors);
		}

		function fetchSponsors(filter) {
			filter = filter ? filter.toLowerCase() : filter;
			return getSponsors().then(function(sponsors) {
				var filteredSponsors = _.filter(sponsors, function(sponsor) {
					return (!filter || sponsor.name.toLowerCase().indexOf(filter) >= 0);
				});

				return $q.when(filteredSponsors);
			});
		};
	}
})();
