(function () {
    'use strict';

    angular
            .module('conference.auth')
            .controller('SignupController', SignupController);

    SignupController.$inject = ['$state', '$ionicLoading', 'loginSignUpService', '$ionicPopup'];

    /* @ngInject */
    function SignupController($state, $ionicLoading, loginSignUpService, $ionicPopup) {
        var vm = angular.extend(this, {
            user: {
                email: null,
                password: null
            },
            signUp: signUp,
            goBack: goBack
        });

        function signUp() {
            if (vm.user.email && vm.user.password) {
                $ionicLoading.show({});
                loginSignUpService.signUp(vm.user.email, vm.user.password).then(
                        function () {
                            $ionicLoading.hide();
                            $state.go('app.tabs.schedule');
                        },
                        function (error) {
                            $ionicLoading.hide();
                            alert('Authentication failed:' + error.message);
                        });
            } else {
//                alert('Please enter email and password both');
                $ionicPopup.alert({
                    title: 'Invalid User Credentials!',
                    template: 'Kindly enter both username and password..'
                });
            }
        }

        function goBack() {
            $state.go('app.signin');
        }
    }
})();