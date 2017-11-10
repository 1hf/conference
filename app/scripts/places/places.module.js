(function() {
	'use strict';

	angular
		.module('conference.places', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
                                .state('app.places', {
					url: '/places',
					templateUrl: 'scripts/places/places.html',
					controller: 'PlacesController as vm'
				});
		});
})();