(function() {
	'use strict';

	angular
		.module('conference.abstracts')
		.controller('AuthorDetailsController', AuthorDetailsController);

	AuthorDetailsController.$inject = ['abstractsService', '$stateParams', '_', '$cordovaEmailComposer', 'externalAppsService'];

	/* @ngInject */
	function AuthorDetailsController(abstractsService, $stateParams, _, $cordovaEmailComposer, externalAppsService) {
		var abstractId = $stateParams.abstractId;
		var authorId = $stateParams.authorId;

		var vm = angular.extend(this, {
			author: null,
			sendEmail: sendEmail,
			openUrl : openUrl
		});

		// ********************************************************************

		(function activate() {
			getAbstract();
		})();

		function getAbstract() {
			return abstractsService.getAuthor(abstractId, authorId).then(function(author) {
				vm.author = author;
			});
		}

		function sendEmail() {
			$cordovaEmailComposer.isAvailable().then(function() {
				var email = {
					to: vm.author.email,
					subject: 'Question on paper',
					body: 'Following on your paper, I would like to contact you for more clarifications.'
				};

				$cordovaEmailComposer.open(email);
			});
		}

		function openUrl(url) {
			externalAppsService.openExternalUrl(url);
		}
	}
})();
