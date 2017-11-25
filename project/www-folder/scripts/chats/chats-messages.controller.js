(function () {
    'use strict';

    angular
            .module('conference.chats')
            .controller('ChatsMessagesController', ChatsMessagesController);

    ChatsMessagesController.$inject = ['ChatsService', '$stateParams', '$state', 'ionicToast', 'externalAppsService', 'localStorageService'];

    /* @ngInject */
    function ChatsMessagesController(ChatsService, $stateParams, $state, ionicToast, externalAppsService, localStorageService) {

        var vm = angular.extend(this, {
            message: {
                messageText: null
            },
            fromuser: $stateParams.user,
            abstract: null,
            messages: [],
//            goToAuthorDetail: goToAuthorDetail,
            toggleFavorites: toggleFavorites,
            openPdf: openPdf,
            sendMessage: sendMessage
        });

        (function activate() {
            getChat();
        })();

        function sendMessage() {
            var now = new Date().getTime();

            var message = {
                messageFrom: JSON.parse(localStorageService.get('authUser')).$id,
                messageTo: $stateParams.user.$id,
                messengerName: JSON.parse(localStorageService.get('authUser')).firstName+" "+JSON.parse(localStorageService.get('authUser')).lastName,
                messageText: vm.message.messageText,
                messageDate: now,
                isDeleted: false
            };
            console.log(angular.toJson(message));
            ChatsService.addMessage(message).then(function (response) {
                console.log(angular.toJson(response));
                vm.message.messageText = '';
                getChat();
            }, function (err) {
                console.log(angular.toJson(err));
            });
        }

        function getChat() {
            vm.messages = [];
            if(!$stateParams.user){
                $state.go('app.chats');
            }else{
               console.log(angular.toJson($stateParams.user.$id+"  "+JSON.parse(localStorageService.get('authUser')).$id)); 
               ChatsService.getChat(JSON.parse(localStorageService.get('authUser')).$id,$stateParams.user.$id).then(function(res){
                    console.log(angular.toJson(res));
                    var chatmessages = res;
                    angular.forEach(chatmessages, function(v,k){
                        console.log(angular.toJson(v));
                        if((v.messageFrom == $stateParams.user.$id && v.messageTo == JSON.parse(localStorageService.get('authUser')).$id) || (v.messageFrom == JSON.parse(localStorageService.get('authUser')).$id && v.messageTo == $stateParams.user.$id)){
                            vm.messages.push(v);
                        }else{

                        }
                    });
               }, function(err){
                   console.log(angular.toJson(err));
               });
            }
            
            
//            return ChatsService.getChat(abstractId).then(function (abstract) {
//                vm.abstract = abstract;
//                vm.abstract.isInFavorites = ChatsService.isInFavorites(vm.abstract.$id);
//            })
        }

//        function goToAuthorDetail(authorId) {
//            $state.go('app.abstract-author', {
//                abstractId: vm.abstract.$id,
//                authorId: authorId
//            });
//        }

        function toggleFavorites() {
            vm.abstract.isInFavorites = !vm.abstract.isInFavorites;
            if (vm.abstract.isInFavorites) {
                ChatsService.toggleFavorites(vm.abstract.$id, true);
                ionicToast.show('\'' + vm.abstract.title + '\' has been added to your Favorites', 'bottom', false, 2000);
            } else {
                ChatsService.toggleFavorites(vm.abstract.$id, false);
                ionicToast.show('\'' + vm.abstract.title + '\' has been removed from your Favorites', 'bottom', false, 2000);
            }
        }

        function openPdf() {
            externalAppsService.openPdf(vm.abstract.pdf);
        }
    }
})();
