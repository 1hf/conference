(function() {
	'use strict';

	angular
		.module('conference.auth')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$state', '$ionicLoading', 'loginSignUpService', '$ionicPopup', '$rootScope'];

	/* @ngInject */
	function LoginController($state, $ionicLoading, loginSignUpService, $ionicPopup, $rootScope) {
		var vm = angular.extend(this, {
			user: {
                userName: null,
                password: null
            },
            showLogin: true,
            showReset: false,
            loginUser: loginUser,
            gotoSignUp: gotoSignUp,
            displayReset: displayReset,
            displayLogin: displayLogin,
            resetPassword: resetPassword
		});

		function gotoSignUp() {
            vm.user.userName = null;
            vm.user.password = null;
            $state.go('app.signup');
        }
        
        function loginUser() {
            if (vm.user.userName && vm.user.password) {
                $ionicLoading.show({template: 'Logging you in...'});
                loginSignUpService.login(vm.user.userName, vm.user.password).then(
                        function (res) {
                            console.log(angular.toJson(res));
                            if(res){
                                $ionicLoading.hide();
                                $rootScope.$emit('loggedIn');
                                $state.go('app.tabs.schedule'); 
                            }else{
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: 'Invalid User Credentials!',
                                    template: 'Kindly enter a valid email/mobile and password.'
                                });
                            }                           
                            
                        },
                        function (error) {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'Invalid User Credentials!',
                                template: 'Kindly enter a valid email/mobile and password.'
                            });
                        });
            } else {
                $ionicPopup.alert({
                    title: 'Invalid!',
                    template: 'Kindly enter your email/mobile and password.'
                });
            }
        }
                function displayReset() {
            vm.user.password = null;
            vm.showLogin = false;
            vm.showReset = true;
        }

        function displayLogin() {
            vm.user.mobile = null;
            vm.showReset = false;
            vm.showLogin = true;
        }

        function resetPassword() {
            if (vm.user.email && vm.user.mobile) {

            } else {
                $ionicPopup.alert({
                    title: 'Invalid!',
                    template: 'Kindly enter your email and mobile number.'
                });
            }
        }

//		function signIn() {
//			if (vm.user.email && vm.user.password) {
//				$ionicLoading.show({});
//				loginSignUpService.signIn(vm.user.email, vm.user.password).then(
//					function() {
//						$ionicLoading.hide();
//					},
//					function(error) {
//						$ionicLoading.hide();
//						alert('Authentication failed:' + error.message);
//					});
//			} else {
//				alert('Please enter email and password both');
//			}
//		}
	}
})();