(function() {
	'use strict';

	angular
		.module('conference.tutorial', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('tutorial', {
					url: '/tutorial',
					templateUrl: 'scripts/tutorial/tutorial.html',
					controller: 'TutorialController as vm'
				});
		});
})();
