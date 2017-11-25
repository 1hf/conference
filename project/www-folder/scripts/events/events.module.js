(function() {
	'use strict';

	angular
		.module('conference.events', [
			'ionic',
			'ngCordova'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.events', {
					url: '/events',
					templateUrl: 'scripts/events/events.html',
					controller: 'EventsController as vm'
				})
				.state('app.event-details', {
					url: '/event-details/:id',
					templateUrl: 'scripts/events/event-details.html',
					controller: 'EventDetailsController as vm'
				});
		});
})();
