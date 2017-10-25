(function() {
	'use strict';

	angular
		.module('conference.schedule')
		.controller('ScheduleController', ScheduleController);

	ScheduleController.$inject = ['scheduleService', '$state', 'filterModal', '_', '$scope'];

	/* @ngInject */
	function ScheduleController(scheduleService, $state, filterModal, _, $scope) {
		var vm = angular.extend(this, {
			filter: null,
			favorites: false,
			filterBySessionId: null,
			filterByDayId: null,
			schedule: [],
			goToSessionDetail: goToSessionDetail,
			filterChanged: filterChanged,
			showFavorites: showFavorites,
			showAll: showAll,
			showFilter: showFilter,
			getClasses: getClasses,
			clearSessionFilter: clearSessionFilter
		});

		//*********************************************

		$scope.$on('$ionicView.beforeEnter', function() {
			loadSchedule();
		});

		function getClasses(type) {
			switch (type) {
				case 'day':
					return 'item-divider day';
				case 'session':
					return 'item-divider session';
				case 'subsession':
					return '';
			}
		}

		function clearSessionFilter() {
			vm.filterBySessionId = null;
			vm.filterByDayId = null;
			loadSchedule();
		}

		function loadSchedule() {
			scheduleService.getScheduleDays(vm.favorites, vm.filter, vm.filterBySessionId, vm.filterByDayId).then(function(items) {
				vm.schedule = items;
			});
		}

		function goToSessionDetail(session) {
			scheduleService.setSession(session)
			$state.go('app.tabs.schedule-details');
		}

		function filterChanged() {
			loadSchedule();
		}

		function showFavorites() {
			vm.favorites = true;
			loadSchedule();
		}

		function showAll() {
			vm.favorites = false;
			loadSchedule();
		}

		function showFilter() {
			scheduleService.getSessionFilterData().then(function(days) {
				var scope = filterModal.scope;
				scope.vm = {
					days: days,
					day: vm.filterByDayId && vm.filterByDayId !== 'all' ? _.find(days, '$id', vm.filterByDayId) : 'all',
					sessionId: vm.filterBySessionId ? vm.filterBySessionId : 'all',

					setDefaultSession: function() {
						scope.vm.sessionId = 'all';
					},
					getSessions: function(day) {
						if (day !== 'all') {
							return day.sessions;
						} else {
							var sessions = [];
							_.forEach(scope.vm.days, function(item) {
								sessions = sessions.concat(item.sessions);
							});
							return sessions;
						}
					},

					closeFilter: function() {
						filterModal.hide();
					},
					applyFilters: function() {
						filterModal.hide();
						var scope = filterModal.scope;
						vm.filterBySessionId = scope.vm.sessionId === 'all' ? null : scope.vm.sessionId;
						vm.filterByDayId = scope.vm.day === 'all' ? null : scope.vm.day.$id;
						loadSchedule();
					}
				};
				filterModal.show();
			});
		}
	}
})();
