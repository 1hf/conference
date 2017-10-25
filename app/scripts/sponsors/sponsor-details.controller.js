(function() {
	'use strict';

	angular
		.module('conference.sponsors')
		.controller('SponsorDetailsController', SponsorDetailsController);

	SponsorDetailsController.$inject = ['sponsorsService', '$stateParams', '$cordovaEmailComposer', 'externalAppsService'];

	/* @ngInject */
	function SponsorDetailsController(sponsorsService, $stateParams, $cordovaEmailComposer, externalAppsService) {
		var sponsorId = $stateParams.id
		var vm = angular.extend(this, {
			sponsor: null,
			sendEmail: sendEmail,
			openUrl : openUrl
		});

		// ********************************************************************

		(function activate() {
			getSponsor();
		})();

		function getSponsor() {
			return sponsorsService.getSponsor(sponsorId).then(function(sponsor) {
				return vm.sponsor = sponsor;
			})
		}

		function sendEmail() {
			$cordovaEmailComposer.isAvailable().then(function() {
				var email = {
					to: vm.sponsor.email,
					subject: 'Question',
					body: 'I would like to contact you for more information.'
				};

				$cordovaEmailComposer.open(email);
			});
		}

		function openUrl(url) {
			externalAppsService.openExternalUrl(url);
		}
	}
})();
