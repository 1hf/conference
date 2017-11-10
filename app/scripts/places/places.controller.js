(function() {
	'use strict';

	angular
		.module('conference.places')
		.controller('PlacesController', PlacesController);

	PlacesController.$inject = ['$ionicActionSheet', 'placesService', 'externalAppsService'];

	/* @ngInject */
	function PlacesController($ionicActionSheet, placesService, externalAppsService) {

		var vm = angular.extend(this, {
			info: null,
			vanue: null
		});

		//*********************************************

		(function activate() {
			//getConferenceData();
		})();



	}
})();