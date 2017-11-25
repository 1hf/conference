(function () {
    'use strict';

    angular
            .module('conference.social')
            .controller('socialController', socialController);

    socialController.$inject = ['socialService', 'loginSignUpService', '$filter', '$state', '$interval', '$cordovaCamera', '$ionicLoading', '$ionicListDelegate', 'localStorageService', 'filterModal', '_', '$scope', '$q'];

    /* @ngInject */
    function socialController(socialService, loginSignUpService, $filter, $state, $interval, $cordovaCamera, $ionicLoading, $ionicListDelegate, localStorageService, filterModal, _, $scope, $q) {
        var vm = angular.extend(this, {
            message: {
                messageText: null,
                pictureMessage: null
            },
            messages: [],
            users: [],
            filter: null,
            favorites: false,
            types: [],
            dates: [],
            goToAbstractDetail: goToAbstractDetail,
            showFilter: showFilter,
            getTypes: getTypes,
            filterChanged: filterChanged,
            addFavorites: addFavorites,
            showFavorites: showFavorites,
            removeFavorites: removeFavorites,
            showAll: showAll,
            showMessages: showMessages,
            submitMessage: submitMessage,
            doRefresh: doRefresh,
            clickImage: clickImage,
            uploadImage: uploadImage
        });

        //*********************************************

        (function activate() {
            loadUsers();
            //$q.all(getTypes(), getDates()).then(fetchChats);
        })()

        $scope.$on('$ionicView.enter', function () {

            //$q.all(getTypes(), getDates()).then(fetchChats);
        });
        $scope.$watch(vm.messages, function () {
            console.log('hey, myVar has changed!');
            showMessages();
        });
//        $interval(function () {
//            showMessages();
//        }, 5000);

        function clickImage() {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                //sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                vm.message.pictureMessage = "data:image/jpeg;base64," + imageData;
                submitMessage();
            }, function (err) {
                console.log(angular.toJson(err));
            });
        }
        function uploadImage() {

            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                //sourceType: Camera.PictureSourceType.CAMERA,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                vm.message.pictureMessage = "data:image/jpeg;base64," + imageData;
                submitMessage();
                //submitMessage(vm.message.pictureMessage);
            }, function (err) {
                console.log(angular.toJson(err));
            });
        }
        function submitMessage() {
            var now = new Date().getTime();

            var message = {
                messageFrom: JSON.parse(localStorageService.get('authUser')).$id,
                messengerName: '',
                messengerPic: '',
                messageTo: '',
                messageText: vm.message.messageText,
                pictureMessage: vm.message.pictureMessage,
                messageDate: now,
                isDeleted: false
            };
            console.log(angular.toJson(message));
            socialService.addMessage(message).then(function (response) {
                console.log(angular.toJson(response));
                vm.message.messageText = '';
                vm.message.pictureMessage = '';
//                        if(!vm.messages[0]){
//                            showMessages();
//                        }
                showMessages();
            }, function (err) {
                console.log(angular.toJson(err));
            });
        }
        function loadUsers() {
            $ionicLoading.show({template: 'Loading messages...'});
            loginSignUpService.getUsers().then(function (users) {
                vm.users = users;
                showMessages();
                console.log(vm.users);
            }, function (err) {
                console.log(angular.toJson(err));
            });
        }
        function addNamePic() {
            angular.forEach(vm.messages, function (val, key) {
                val.messageDate = new Date(val.messageDate);
                var user = $filter('filter')(vm.users, {$id: val.messageFrom});
                console.log(user);
                val.messengerName = user[0].firstName;
                val.messengerPic = user[0].avatar;
            });
        }
        function showMessages() {

            socialService.getMessages().then(function (messages) {
                console.log(angular.toJson(messages));
                $ionicLoading.hide();
                if (!messages[0]) {
                    vm.noRecord = 'No messages.';
                } else {
                    vm.noRecord = '';
                    vm.messages = messages;
                    addNamePic();
                }
            }, function (err) {
                console.log(angular.toJson(err));
            });
        }

        function doRefresh() {
            showMessages();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        }
        function goToAbstractDetail(id) {
            $state.go('app.chats-messages', {
                id: id
            });
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
            return socialService.getTypes().then(function (items) {
                vm.types = items;
            })
        }

        function getDates() {
            return socialService.getDates().then(function (items) {
                vm.dates = items;
            })
        }

        function fetchChats() {
            socialService.fetchChats(vm.filter, vm.favorites, vm.types, vm.dates).then(function (items) {
                vm.chats = items;
            })
        }

        function filterChanged() {
            fetchChats();
        }

        function addFavorites(event, abstract) {
            event.stopPropagation();
            socialService.toggleFavorites(abstract.$id, true);
            $ionicListDelegate.closeOptionButtons();
        }

        function removeFavorites(abstract) {
            socialService.toggleFavorites(abstract.$id, false);
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
