(function() {
	'use strict';

	angular
		.module('conference.menu', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app', {
					url: '/app',
					abstract: true,
					templateUrl: 'scripts/menu/menu.html',
					controller: 'MenuController as vm',
					resolve: {
						loggedUser: ['loginSignUpService', function(loginSignUpService) {
							return loginSignUpService.getUser().isSignedIn;
						}]
					}
				})
				.state('app.tabs', {
					url: '/tab',
					templateUrl: 'scripts/menu/tabs.html',
					resolve: {
						data: function(dataService) {
							return dataService.init();
						}
					}
				});
		});
})();
