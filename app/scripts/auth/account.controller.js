(function() {
	'use strict';

	angular
		.module('conference.auth')
		.controller('AccountController', AccountController);

	AccountController.$inject = ['loginSignUpService'];

	/* @ngInject */
	function AccountController(loginSignUpService) {
		var vm = angular.extend(this, {
			email: null,
			logout: logout
		});

		(function activate() {
			getUser()
		})();

		function getUser() {
			vm.email = loginSignUpService.getUser().email;
		}

		function logout() {
			loginSignUpService.logout()
		}
	}
})();