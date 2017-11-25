(function() {
	'use strict';

	angular
		.module('conference.committees')
		.controller('CommitteeDetailsController', CommitteeDetailsController);

	CommitteeDetailsController.$inject = ['committeesService', '$stateParams', '$state'];

	/* @ngInject */
	function CommitteeDetailsController(committeesService, $stateParams, $state) {
		var committeeId = $stateParams.id;
		var vm = angular.extend(this, {
			committee: null,
			goToMemberDetails: goToMemberDetails
		});

		// ********************************************************************

		(function activate() {
			getCommittee();
		})();

		function getCommittee() {
			return committeesService.getCommittee(committeeId).then(function(committee) {
				vm.committee = committee;
			})
		}

		function goToMemberDetails(memberId) {
			$state.go('app.committee-member', {
				committeeId: vm.committee.$id,
				memberId: memberId
			});
		}

	}
})();
