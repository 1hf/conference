(function() {
	'use strict';

	angular
		.module('conference.auth')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$state', '$ionicLoading', 'loginSignUpService'];

	/* @ngInject */
	function LoginController($state, $ionicLoading, loginSignUpService) {
		var vm = angular.extend(this, {
			user: {
				email: null,
				password: null
			},
			signIn: signIn,
			signUp: signUp
		});

		function signUp() {
			$state.go('app.signup');
		}

		function signIn() {
			if (vm.user.email && vm.user.password) {
				$ionicLoading.show({});
				loginSignUpService.signIn(vm.user.email, vm.user.password).then(
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