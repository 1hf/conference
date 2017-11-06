(function() {
	'use strict';

	angular
		.module('conference.speakers')
		.factory('speakersService', speakersService);

	speakersService.$inject = ['dataService'];

	/* @ngInject */
	function speakersService(dataService) {
		var service = {
			getSpeakers: getSpeakers,
			getSpeaker: getSpeaker
		};
		return service;

		function getSpeakers() {
			return dataService.getSpeakers();
		}

		function getSpeaker(speakerId) {
			return dataService.getSpeaker(speakerId);
		}
	}
})();
