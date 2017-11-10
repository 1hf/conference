(function() {
	'use strict';

	angular
		.module('conference.abstracts')
		.controller('AbstractsDetailsController', AbstractsDetailsController);

	AbstractsDetailsController.$inject = ['abstractsService', '$stateParams', '$state', 'ionicToast', 'externalAppsService'];

	/* @ngInject */
	function AbstractsDetailsController(abstractsService, $stateParams, $state, ionicToast, externalAppsService) {
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
			return abstractsService.getAbstract(abstractId).then(function(abstract) {
				vm.abstract = abstract;
				vm.abstract.isInFavorites = abstractsService.isInFavorites(vm.abstract.$id);
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
				abstractsService.toggleFavorites(vm.abstract.$id, true);
				ionicToast.show('\'' + vm.abstract.title + '\' has been added to your Favorites', 'bottom', false, 2000);
			} else {
				abstractsService.toggleFavorites(vm.abstract.$id, false);
				ionicToast.show('\'' + vm.abstract.title + '\' has been removed from your Favorites', 'bottom', false, 2000);
			}
		}

		function openPdf() {
			externalAppsService.openPdf(vm.abstract.pdf);
		}
	}
})();
