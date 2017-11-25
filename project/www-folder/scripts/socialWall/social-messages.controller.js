(function() {
	'use strict';

	angular
		.module('conference.social')
		.controller('socialMessagesController', socialMessagesController);

	socialMessagesController.$inject = ['socialService', '$stateParams', '$state', 'ionicToast', 'externalAppsService'];

	/* @ngInject */
	function socialMessagesController(socialService, $stateParams, $state, ionicToast, externalAppsService) {
		var abstractId = $stateParams.id;

		var vm = angular.extend(this, {
			abstract: null,
			goToAuthorDetail: goToAuthorDetail,
			toggleFavorites: toggleFavorites,
			openPdf: openPdf
		});

		// ********************************************************************

		(function activate() {
			getAbstract();
		})();

		function getAbstract() {
			return socialService.getAbstract(abstractId).then(function(abstract) {
				vm.abstract = abstract;
				vm.abstract.isInFavorites = ChatsService.isInFavorites(vm.abstract.$id);
			})
		}

		function goToAuthorDetail(authorId) {
			$state.go('app.abstract-author', {
				abstractId: vm.abstract.$id,
				authorId: authorId
			});
		}

		function toggleFavorites() {
			vm.abstract.isInFavorites = !vm.abstract.isInFavorites;
			if (vm.abstract.isInFavorites) {
				socialService.toggleFavorites(vm.abstract.$id, true);
				ionicToast.show('\'' + vm.abstract.title + '\' has been added to your Favorites', 'bottom', false, 2000);
			} else {
				socialService.toggleFavorites(vm.abstract.$id, false);
				ionicToast.show('\'' + vm.abstract.title + '\' has been removed from your Favorites', 'bottom', false, 2000);
			}
		}

		function openPdf() {
			externalAppsService.openPdf(vm.abstract.pdf);
		}
	}
})();
