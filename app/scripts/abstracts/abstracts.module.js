(function() {
	'use strict';

	angular
		.module('conference.abstracts', [
			'ionic',
			'ngCordova',
			'ionic-toast'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.abstracts', {
					url: '/abstracts',
					templateUrl: 'scripts/abstracts/abstracts.html',
					controller: 'AbstractsController as vm',
					resolve: {
						filterModal: ['$ionicModal', '$rootScope', function($ionicModal, $rootScope) {
							return $ionicModal.fromTemplateUrl('scripts/abstracts/filter.html', {
								scope: $rootScope,
								animation: 'slide-in-up'
							});
						}]
					}
				})
				.state('app.abstracts-details', {
					url: '/abstracts/:id',
					templateUrl: 'scripts/abstracts/abstracts-details.html',
					controller: 'AbstractsDetailsController as vm'
				})
				.state('app.abstract-author', {
					url: '/abstracts/:abstractId/author/:authorId',
					templateUrl: 'scripts/abstracts/author-details.html',
					controller: 'AuthorDetailsController as vm'
				});
		});
})();