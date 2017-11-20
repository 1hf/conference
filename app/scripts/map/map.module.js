(function() {
	'use strict';

	angular
		.module('conference.map', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider

				.state('app.tabs.map', {
					url: '/map',
					views: {
						'map-tab': {
							templateUrl: 'scripts/map/map.html',
							controller: 'MapController as vm'
						}
					}
				});
		});
})();