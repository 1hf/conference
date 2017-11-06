(function() {
	'use strict';

	angular
		.module('conference.about', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.tabs.about', {
					url: '/about',
					views: {
						'about-tab': {
							templateUrl: 'scripts/about/about.html',
							controller: 'AboutController as vm'
						}
					}
				});
		});
})();