(function() {
	'use strict';

	angular
		.module('conference.map')
		.controller('MapController', MapController);

	MapController.$inject = ['mapService'];

	/* @ngInject */
	function MapController(mapService) {
		var vm = angular.extend(this, {
			data: null
		});

		(function activate() {
			initMapDetails()
		})();

		function initMapDetails() {
			mapService.getMapDetails().then(function(data) {
				vm.data = data;
			})
		}

	}
})();