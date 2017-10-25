(function() {
	'use strict';

	angular
		.module('conference.events')
		.controller('EventDetailsController', EventDetailsController);

	EventDetailsController.$inject = ['eventsService', '$stateParams', 'ionicToast'];

	/* @ngInject */
	function EventDetailsController(eventsService, $stateParams, ionicToast) {
		var eventId = $stateParams.id
		var vm = angular.extend(this, {
			event: null,
			origin: {
				lat: null,
				lon: null
			},
			zoom: null,
			markers: null,
			toggleFavorites: toggleFavorites
		});

		// ********************************************************************

		(function activate() {
			getEvent();
		})();

		function getEvent() {
			return eventsService.getEvent(eventId).then(function(event) {
				vm.event = event;
				vm.event.isInFavorites = eventsService.isInFavorites(vm.event.$id);
				vm.origin = {
					lat: event.mapData.latitude,
					lon: event.mapData.longitude
				};
				vm.zoom = parseInt(event.mapData.zoomlevel);
				vm.markers = [
					{
						name: event.mapData.annoTitle,
						lat: event.mapData.latitude,
						lon: event.mapData.longitude
					}
				];
			})
		};

		function toggleFavorites() {
			vm.event.isInFavorites = !vm.event.isInFavorites;
			if (vm.event.isInFavorites) {
				eventsService.toggleFavorites(vm.event.$id, true);
				ionicToast.show('\'' + vm.event.title + '\' has been added to your Favorites', 'bottom', false, 2000);
			} else {
				eventsService.toggleFavorites(vm.event.$id, false);
				ionicToast.show('\'' + vm.event.title + '\' has been removed from your Favorites', 'bottom', false, 2000);
			}
		}

	}
})();