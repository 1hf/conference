(function() {
	'use strict';

	angular
		.module('conference.abstracts')
		.controller('AbstractsController', AbstractsController);

	AbstractsController.$inject = ['abstractsService', '$state', '$ionicListDelegate', 'filterModal', '_', '$scope', '$q'];

	/* @ngInject */
	function AbstractsController(abstractsService, $state, $ionicListDelegate, filterModal, _, $scope, $q) {
		var vm = angular.extend(this, {
			abstracts: [],
			filter: null,
			favorites: false,
			types: [],
			dates: [],
			goToAbstractDetail: goToAbstractDetail,
			showFilter: showFilter,
			getTypes: getTypes,
			filterChanged: filterChanged,
			addFavorites: addFavorites,
			showFavorites: showFavorites,
			removeFavorites: removeFavorites,
			showAll: showAll
		});

		//*********************************************

		(function activate() {
			$q.all(getTypes(), getDates()).then(fetchAbstracts);
		})()

		$scope.$on('$ionicView.enter', function() {
			$q.all(getTypes(), getDates()).then(fetchAbstracts);
		});

		function goToAbstractDetail(id) {
			$state.go('app.abstracts-details', {
				id: id
			});
		}

		function showFilter() {
			var scope = filterModal.scope;
			scope.vm = {
				types: _.clone(vm.types, true),
				dates: _.clone(vm.dates, true),
				closeFilter: function() {
					filterModal.hide();
				},
				applyFilters: function() {
					filterModal.hide();
					var scope = filterModal.scope;
					vm.types = scope.vm.types;
					vm.dates = scope.vm.dates;
					fetchAbstracts();
				}
			};
			filterModal.show();
		}

		function getTypes() {
			return abstractsService.getTypes().then(function(items) {
				vm.types = items;
			})
		}

		function getDates() {
			return abstractsService.getDates().then(function(items) {
				vm.dates = items;
			})
		}

		function fetchAbstracts() {
			abstractsService.fetchAbstracts(vm.filter, vm.favorites, vm.types, vm.dates).then(function(items) {
				vm.abstracts = items;
			})
		}

		function filterChanged() {
			fetchAbstracts();
		}

		function addFavorites(event, abstract) {
			event.stopPropagation();
			abstractsService.toggleFavorites(abstract.$id, true);
			$ionicListDelegate.closeOptionButtons();
		}

		function removeFavorites(abstract) {
			abstractsService.toggleFavorites(abstract.$id, false);
			showFavorites();
		}

		function showFavorites() {
			vm.favorites = true;
			fetchAbstracts();
		}

		function showAll() {
			vm.favorites = false;
			fetchAbstracts();
		}

	}
})();
