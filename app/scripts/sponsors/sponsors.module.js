(function() {
	'use strict';

	angular
		.module('conference.sponsors', [
			'ionic',
			'ngCordova'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.sponsors', {
					url: '/sponsors',
					templateUrl: 'scripts/sponsors/sponsors.html',
					controller: 'SponsorsController as vm'
				})
				.state('app.sponsor-details', {
					url: '/sponsor-details/:id',
					templateUrl: 'scripts/sponsors/sponsor-details.html',
					controller: 'SponsorDetailsController as vm'
				});
		});
})();
