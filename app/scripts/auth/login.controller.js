(function () {
    'use strict';

    angular
            .module('conference.auth')
            .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$ionicSlideBoxDelegate', '$interval', 'localStorageService', '$state', '$stateParams', '$ionicLoading', 'loginSignUpService', '$ionicPopup', '$rootScope'];

    /* @ngInject */
    function LoginController($scope, $ionicSlideBoxDelegate, $interval, localStorageService, $state, $stateParams, $ionicLoading, loginSignUpService, $ionicPopup, $rootScope) {
        var vm = angular.extend(this, {
            user: {
                userName: null
//                password: null,
//                mobileNumber: null
            },
//            showLogin: true,
//            showReset: false,
            loginUser: loginUser,
            gotoSignUp: gotoSignUp,
            gotoUpload: gotoUpload
//            displayReset: displayReset,
//            displayLogin: displayLogin,
//            resetPassword: resetPassword
        });

        (function activate() {
            loadUser();

            // fetchEvents();
        })();

        function loadUser() {
            if ($stateParams.userName) {
                vm.user.userName = $stateParams.userName;
                vm.loginUser();
            } else {
                console.log(angular.toJson(localStorageService.get('authUser')));
                if (localStorageService.get('authUser')) {
                    if (JSON.parse(localStorageService.get('authUser')).isSignedIn) {
                        $ionicLoading.show({template: 'Logging you in...'});
                        $state.go('app.tabs.schedule');
                    } else {
                        //
                    }
                } else {
                    //
                }
            }
        }

        function gotoUpload() {
            var data = [];
            angular.forEach(data, function (val, key) {
                console.log(angular.toJson(val));
                loginSignUpService.upload(val, "speakers").then(function (res) {
                    console.log(angular.toJson(res));
                });
            });

        }

        function loginUser() {
            if (vm.user.userName) {
                $ionicLoading.show({template: 'Logging you in...'});
                var exp = /(\w(=?@)\w+\.{1}[a-zA-Z]{2,})/i;
                if (exp.test(vm.user.userName)) {
                    loginSignUpService.login(vm.user.userName).then(function (res) {
                        console.log(angular.toJson(res));
                        if (res) {
                            $ionicLoading.hide();
                            $rootScope.$emit('loggedIn');
                            $state.go('app.tabs.schedule');
                        } else {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'Invalid User Credentials!',
                                template: 'Email is not registered. Kindly SignUp.'
                            });
                        }
                    }, function (err) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Error!',
                            template: err
                        });
                    });

                } else if ((Number.isInteger(Number(vm.user.userName)))) {
                    loginSignUpService.loginMobile(parseInt(vm.user.userName)).then(function (res) {
                        if (res) {
                            $ionicLoading.hide();
                            $rootScope.$emit('loggedIn');
                            $state.go('app.tabs.schedule');
                        } else {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'Invalid User Credentials!',
                                template: 'Mobile is not registered. Kindly SignUp.'
                            });
                        }
                    }, function (err) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Error!',
                            template: err
                        });
                    });
                } else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Invalid User Credentials!',
                        template: 'Kindly enter a valid Email / Mobile.'
                    });
                }
            } else {
                $ionicPopup.alert({
                    title: 'Invalid!',
                    template: 'Kindly enter your Email / Mobile.'
                });
            }
        }

        function gotoSignUp() {
            vm.user.userName = null;
//            vm.user.password = null;
            $state.go('app.signup');
        }

//        function displayReset() {
//            vm.user.password = null;
//            vm.showLogin = false;
//            vm.showReset = true;
//        }
//
//        function displayLogin() {
//            vm.user.mobileNumber = null;
//            vm.showReset = false;
//            vm.showLogin = true;
//        }

//        function randomString(length, chars) {
//            var result = '';
//            for (var i = length; i > 0; --i)
//                result += chars[Math.floor(Math.random() * chars.length)];
//            return result;
//        }

//        function resetPassword() {
//            if (vm.user.userName && vm.user.mobileNumber) {
//                var randomStringChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@$%*&^!()';
//                var randomPassword = randomString(10, randomStringChars);
//                loginSignUpService.getUserDetails(vm.user.userName).then(function (response) {
//                    if (angular.toJson(response.$value)) {
//                        $ionicPopup.alert({
//                            title: 'Invalid!',
//                            template: 'Kindly enter a valid username.'
//                        });
//                    } else {
//                        angular.forEach(response, function (v, k) {
//                            console.log(angular.toJson(v + "  " + k));
//                            v.$id = k;
//                            console.log(angular.toJson(v));
//                            var message = 'Dear ' + v.firstName + ' ' + v.lastName + ', your password has been reset to ' + randomPassword + '.';
//                            loginSignUpService.sendSMS(vm.user.mobileNumber, message).then(function (res) {
//                                console.log('SUCCESS ' + JSON.stringify(res));
//                            }, function (err) {
//                                console.log('ERROR ' + JSON.stringify(err));
//                            });
//                            var data = {password: btoa(randomPassword)};
//                            loginSignUpService.updateUser(v.$id, data).then(function (res) {
//                                console.log(angular.toJson(res));
//                                $ionicPopup.alert({
//                                    title: 'Success!',
//                                    template: 'Password Reset successfully. You will receive the new password in your mobile number.'
//                                });
//                            }, function (err) {
//                                console.log(angular.toJson(err));
//                            });
//                        });
//                    }
//                });
//            } else {
//                $ionicPopup.alert({
//                    title: 'Invalid!',
//                    template: 'Kindly enter your username and mobile number.'
//                });
//            }
//        }
    }
})();