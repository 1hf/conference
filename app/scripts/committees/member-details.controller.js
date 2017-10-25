(function() {
	'use strict';

	angular
		.module('conference.committees')
		.controller('MemberDetailsController', MemberDetailsController);

	MemberDetailsController.$inject = ['committeesService', '$stateParams', '_', '$cordovaEmailComposer', 'externalAppsService'];

	/* @ngInject */
	function MemberDetailsController(committeesService, $stateParams, _, $cordovaEmailComposer, externalAppsService) {
		var committeeId = $stateParams.committeeId;
		var memberId = $stateParams.memberId;

		var vm = angular.extend(this, {
			member: null,
      sendEmail: sendEmail,
			openUrl : openUrl
		});

		// ********************************************************************

		(function activate() {
			getCommitteeMember();
		})();

		function getCommitteeMember() {
			return committeesService.getCommitteeMember(committeeId, memberId).then(function(member) {
				vm.member = member;
			});
		}

    function sendEmail() {
			$cordovaEmailComposer.isAvailable().then(function() {
				var email = {
					to: vm.member.email,
					subject: 'Question',
					body: 'Regarding the conference, I would like to contact you for more clarifications.'
				};

				$cordovaEmailComposer.open(email);
			});
		}

		function openUrl(url) {
			externalAppsService.openExternalUrl(url);
		}
	}
})();
