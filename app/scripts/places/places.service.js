(function() {
	'use strict';

	angular
		.module('conference.places')
		.factory('placesService', placesService);

	placesService.$inject = ['dataService'];

	/* @ngInject */
	function placesService(dataService) {

		var service = {
			getConferenceData: getConferenceData
		};
		return service;


		function getConferenceData() {
			return dataService.getConferenceData();
		}
	}
})();
