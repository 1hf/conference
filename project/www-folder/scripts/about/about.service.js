(function() {
	'use strict';

	angular
		.module('conference.chats')
		.factory('aboutService', aboutService);

	aboutService.$inject = ['dataService'];

	/* @ngInject */
	function aboutService(dataService) {

		var service = {
			getConferenceData: getConferenceData
		};
		return service;


		function getConferenceData() {
			return dataService.getConferenceData();
		}
	}
})();
