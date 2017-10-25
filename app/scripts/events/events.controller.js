(function() {
	'use strict';

	angular
		.module('conference.events')
		.controller('EventsController', EventsController);

	EventsController.$inject = ['$state', 'eventsService', '$ionicListDelegate', '$scope'];

	/* @ngInject */
	function EventsController($state, eventsService, $ionicListDelegate, $scope) {
		var vm = angular.extend(this, {
			events: [],
			filter: null,
			favorites: false,
			goToEventDetails: goToEventDetails,
			showFavorites: showFavorites,
			showAll: showAll,
			filterChanged: filterChanged,
			addFavorites: addFavorites,
			removeFavorites: removeFavorites
		});

		//*********************************************

		(function activate() {
			// fetchEvents();
		})();

		$scope.$on('$ionicView.enter', function() {
			fetchEvents();
		});

		function fetchEvents() {
			eventsService.fetchEvents(vm.filter, vm.favorites).then(function(items) {
				vm.events = items;
			})
		}

		function goToEventDetails(id) {
			$state.go('app.event-details', {
				id: id
			});
		}

		function filterChanged() {
			fetchEvents();
		}

		function addFavorites(event, eventId) {
			event.stopPropagation();
			eventsService.toggleFavorites(eventId, true);
			$ionicListDelegate.closeOptionButtons();
		}

		function removeFavorites(eventId) {
			eventsService.toggleFavorites(eventId, false);
			showFavorites();
		}

		function showFavorites() {
			vm.favorites = true;
			fetchEvents();
		}

		function showAll() {
			vm.favorites = false;
			fetchEvents();
		}
	}
})();
