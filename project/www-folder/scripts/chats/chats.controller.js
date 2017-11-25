(function () {
    'use strict';

    angular
            .module('conference.chats')
            .controller('ChatsController', ChatsController);

    ChatsController.$inject = ['ChatsService', '$state', '$ionicListDelegate', 'filterModal', '_', '$scope', '$q', '$ionicLoading', 'loginSignUpService'];

    /* @ngInject */
    function ChatsController(ChatsService, $state, $ionicListDelegate, filterModal, _, $scope, $q, $ionicLoading, loginSignUpService) {
        var vm = angular.extend(this, {
            chats: [],
            users: [],
            filter: null,
            favorites: false,
            types: [],
            dates: [],
            goToChatsMessages: goToChatsMessages,
            showFilter: showFilter,
            getTypes: getTypes,
            filterChanged: filterChanged,
            addFavorites: addFavorites,
            showFavorites: showFavorites,
            removeFavorites: removeFavorites,
            showAll: showAll
        });

        (function activate() {
            fetchUsers();
        })()

        function fetchUsers() {
            $ionicLoading.show({template: 'Loading Users'});
            loginSignUpService.getUsers().then(function (res) {
                vm.users = res;
                $ionicLoading.hide();
//                console.log(angular.toJson(res));
//                if (res[0]) {
//                    angular.forEach(res, function (val, key) {
//                        vm.users.push(val);
//                        if (res.length - 1 == key) {
//                            $ionicLoading.hide();
//                        }
//                    });
//                } else {
//                    $ionicLoading.hide();
//                }
            });
        }

        function goToChatsMessages(user) {
            $state.go('app.chats-messages', {user: user});
        }

        function showFilter() {
            var scope = filterModal.scope;
            scope.vm = {
                types: _.clone(vm.types, true),
                dates: _.clone(vm.dates, true),
                closeFilter: function () {
                    filterModal.hide();
                },
                applyFilters: function () {
                    filterModal.hide();
                    var scope = filterModal.scope;
                    vm.types = scope.vm.types;
                    vm.dates = scope.vm.dates;
                    fetchChats();
                }
            };
            filterModal.show();
        }

        function getTypes() {
            return ChatsService.getTypes().then(function (items) {
                vm.types = items;
            })
        }

        function getDates() {
            return ChatsService.getDates().then(function (items) {
                vm.dates = items;
            })
        }

        function fetchChats() {
            ChatsService.fetchChats(vm.filter, vm.favorites, vm.types, vm.dates).then(function (items) {
                vm.chats = items;
            })
        }

        function filterChanged() {
            fetchChats();
        }

        function addFavorites(event, abstract) {
            event.stopPropagation();
            ChatsService.toggleFavorites(abstract.$id, true);
            $ionicListDelegate.closeOptionButtons();
        }

        function removeFavorites(abstract) {
            ChatsService.toggleFavorites(abstract.$id, false);
            showFavorites();
        }

        function showFavorites() {
            vm.favorites = true;
            fetchChats();
        }

        function showAll() {
            vm.favorites = false;
            fetchChats();
        }

    }
})();
