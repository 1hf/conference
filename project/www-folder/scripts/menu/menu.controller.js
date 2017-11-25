(function () {
    'use strict';

    angular
            .module('conference.menu')
            .controller('MenuController', MenuController);

    MenuController.$inject = ['$scope', '$rootScope', 'loggedUser', 'loginSignUpService', '$ionicSideMenuDelegate', '$interval', '$ionicSlideBoxDelegate'];

    /* @ngInject */
    function MenuController($scope, $rootScope, loggedUser, loginSignUpService, $ionicSideMenuDelegate, $interval, $ionicSlideBoxDelegate) {
        var vm = angular.extend(this, {
            loggedUser: loggedUser,
            logout: logout
        });

        (function activate() {
        })();

        $scope.banners = ["1", "2", "3"];
        $scope.lengthG = $scope.banners.length;
        $scope.count = 1;
        $interval(function () {
            if ((parseInt($scope.count)) === (parseInt($scope.lengthG))) {
                $scope.count = 1;
                $ionicSlideBoxDelegate.slide(0);
            } else {
                $ionicSlideBoxDelegate.next();
                $scope.count++;
            }
        }, 3000);
        
        function logout() {
            loginSignUpService.logout();
            $ionicSideMenuDelegate.toggleLeft();
        }

        $rootScope.$on('loggedIn', function () {
            vm.loggedUser = true;
        });

        $rootScope.$on('loggedOut', function () {
            vm.loggedUser = false;
        });
    }
})();
