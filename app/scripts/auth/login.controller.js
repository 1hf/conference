(function () {
    'use strict';

    angular
            .module('conference.auth')
            .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', '$ionicLoading', 'loginSignUpService', '$ionicPopup'];

    /* @ngInject */
    function LoginController($state, $ionicLoading, loginSignUpService, $ionicPopup) {
        var vm = angular.extend(this, {
            user: {
                email: null,
                password: null
            },
            showLogin: true,
            showReset: false,
            signIn: signIn,
            signUp: signUp,
            displayReset: displayReset,
            displayLogin: displayLogin,
            resetPassword: resetPassword
        });

        function signUp() {
            $state.go('app.signup');
        }

        function signIn() {
            if (vm.user.email && vm.user.password) {
                $ionicLoading.show({});
                loginSignUpService.signIn(vm.user.email, vm.user.password).then(
                        function () {
                            $ionicLoading.hide();
                            $state.go('app.tabs.schedule');
                        },
                        function (error) {
                            $ionicLoading.hide();
//                            alert('Authentication failed:' + error.message);
                            $ionicPopup.alert({
                                title: 'Invalid User Credentials!',
                                template: 'Kindly enter a valid username and password..'
                            });
                        });
            } else {
//                alert('Please enter email and password both');
                $ionicPopup.alert({
                    title: 'Invalid!',
                    template: 'Kindly enter both username and password..'
                });
            }
        }

        function displayReset() {
            vm.user.password = null;
            vm.showLogin = false;
            vm.showReset = true;
        }

        function displayLogin() {
            vm.mobile = null;
            vm.showReset = false;
            vm.showLogin = true;
        }

        function resetPassword(mobileNumber) {

        }
    }
})();