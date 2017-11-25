(function() {
	'use strict';

	angular
		.module('conference.map')
		.factory('mapService', mapService);

	mapService.$inject = ['dataService', '_'];

	/* @ngInject */
	function mapService(dataService, _) {

		var service = {
			getMapDetails: getMapDetails
		}
		return service;

		//*************************************

		function getMapDetails() {
			return dataService.getMapDetails()
				.then(function(result) {
					var data = {};
					data.origin = {
						lat: result.venue.latitude,
						lon: result.venue.longitude,
						icon: result.venue.marker,
						name: result.venue.title
					};

					var markers = [];
					for (var i = 0; i < result.hotels.length; i++) {
						var marker = result.hotels[i];
						markers.push({
							name: marker.title,
							icon: marker.marker,
							lat: marker.latitude,
							lon: marker.longitude
						});
					}
					markers.push(data.origin);

					data.markers = markers;
					data.zoom = parseFloat(result.zoomlevel, 10);
					return data;
				});
		}
	}
})();