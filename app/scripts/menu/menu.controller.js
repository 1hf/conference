(function() {
	'use strict';

	angular
		.module('conference.menu')
		.controller('MenuController', MenuController);

	MenuController.$inject = ['$rootScope', 'loggedUser', 'loginSignUpService', '$ionicSideMenuDelegate'];

	/* @ngInject */
	function MenuController($rootScope, loggedUser, loginSignUpService, $ionicSideMenuDelegate) {
		var vm = angular.extend(this, {
			loggedUser: loggedUser,
			logout: logout
		});

		(function activate() {
		})();

		//****************************

		function logout() {
			loginSignUpService.logout();
			$ionicSideMenuDelegate.toggleLeft();
		}

		$rootScope.$on('loggedIn', function() {
			vm.loggedUser = true;
		});

		$rootScope.$on('loggedOut', function() {
			vm.loggedUser = false;
		});
	}
})();
