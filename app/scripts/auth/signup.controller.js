(function() {
	'use strict';

	angular
		.module('conference.auth')
		.controller('SignupController', SignupController);

	SignupController.$inject = ['$ionicLoading', 'loginSignUpService'];

	/* @ngInject */
	function SignupController($ionicLoading, loginSignUpService) {
		var vm = angular.extend(this, {
			user: {
				email: null,
				password: null
			},
			signUp: signUp
		});

		function signUp() {
			if (vm.user.email && vm.user.password) {
				$ionicLoading.show({});
				loginSignUpService.signUp(vm.user.email, vm.user.password).then(
					function() {
						$ionicLoading.hide();
					},
					function(error) {
						$ionicLoading.hide();
						alert('Authentication failed:' + error.message);
					});
			} else {
				alert('Please enter email and password both');
			}
		}
	}
})();