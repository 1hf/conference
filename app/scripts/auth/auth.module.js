(function () {
    'use strict';

    angular
            .module('conference.auth', [
                'ionic',
                'ngCordova'
            ])
            .config(function ($stateProvider) {
                $stateProvider
                        .state('app.signin', {
                            url: '/signin',
                            templateUrl: 'scripts/auth/signin.html',
                            controller: 'LoginController as vm'
                        })
                        .state('app.account', {
                            url: '/account',
                            templateUrl: 'scripts/auth/account.html',
                            controller: 'AccountController as vm'
                        })
                        .state('app.signup', {
                            url: '/signup',
                            templateUrl: 'scripts/auth/signup.html',
                            controller: 'SignupController as vm'
                        });
            })
            .run(function ($rootScope, $state, $ionicHistory) {
                $rootScope.$on('loggedIn', function () {
                    $ionicHistory.clearHistory();
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });

                    $state.go('app.account');
                });

                $rootScope.$on('loggedOut', function () {
                    $ionicHistory.clearHistory();
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });

                    $state.go('app.signin');
                });
            });
})();
