(function() {
	'use strict';

	angular
		.module('conference.committees')
		.controller('CommitteesController', CommitteesController);

	CommitteesController.$inject = ['$state', 'committeesService'];

	/* @ngInject */
	function CommitteesController($state, committeesService) {
		var vm = angular.extend(this, {
			committees: [],
			filter: null,
			goToCommitteeDetails: goToCommitteeDetails,
			filterChanged: filterChanged
		});

		//*********************************************

		(function activate() {
			fetchCommittees();
		})();


		function fetchCommittees() {
			committeesService.fetchCommittees(vm.filter).then(function(items) {
				vm.committees = items;
			})
		};

		function goToCommitteeDetails(id) {
			$state.go('app.committee-details', {
				id: id
			});
		}

		function filterChanged() {
			fetchCommittees();
		}
	}
})();
