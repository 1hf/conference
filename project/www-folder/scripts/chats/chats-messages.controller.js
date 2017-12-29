(function () {
    'use strict';

    angular
            .module('conference.chats')
            .controller('ChatsMessagesController', ChatsMessagesController);

    ChatsMessagesController.$inject = ['ChatsService', '$stateParams', '$timeout', '$state', '$ionicLoading', 'ionicToast', 'externalAppsService', 'localStorageService'];

    /* @ngInject */
    function ChatsMessagesController(ChatsService, $stateParams, $timeout, $state, $ionicLoading, ionicToast, externalAppsService, localStorageService) {

        var vm = angular.extend(this, {
            message: {
                messageText: null
            },
            user: {
              firstname: JSON.parse(localStorageService.get('authUser')).firstName,
              lastname: JSON.parse(localStorageService.get('authUser')).lastName
            },
            fromuser: null,
            fromDetails: $stateParams.user,
            abstract: null,
            messages: [],
//            goToAuthorDetail: goToAuthorDetail,
            toggleFavorites: toggleFavorites,
            goBack: goBack,
            openPdf: openPdf,
            sendMessage: sendMessage
        });

        (function activate() {
            if (!$stateParams.user) {
                $state.go('app.chats');
            }else{

                vm.fromuser = $stateParams.user;
                var ref = firebase.database().ref("chatMessages");
                firebase.database().ref().on('value', function (snapshot) {
                    getChat();
                }); 
            }
        })();
        
        function sendMessage() {
            var now = new Date().getTime();
            var msgs = {
                messageFrom: JSON.parse(localStorageService.get('authUser')).$id,
                messageTo: $stateParams.user,
                messages: [],
                messageDate: now,
                isDeleted: false
            };
            var message = {
                messageFrom: JSON.parse(localStorageService.get('authUser')).$id,
                messageTo: $stateParams.user,
                messengerName: JSON.parse(localStorageService.get('authUser')).firstName + " " + JSON.parse(localStorageService.get('authUser')).lastName,
                messageText: vm.message.messageText,
                messageDate: now,
                messageId: now,
                isDeleted: false,
                read:0
            };
            console.log(angular.toJson(vm.messages));
            if(!vm.messages[0]){
            msgs.totalUnread = 1;
            msgs.totalMessages = 1;                
                msgs.messages.push(message);
                console.log('New  '+angular.toJson(msgs));
                ChatsService.addMessage(msgs).then(function (response) {
                    console.log(angular.toJson(response));
                    vm.message.messageText = '';
                    //getChat();
                }, function (err) {
                    console.log(angular.toJson(err));
                });
            }else{
                var count = 0;
                console.log('Push  '+angular.toJson(message));
                var updateId = vm.messages[0].$id;
                console.log(updateId);
                vm.messages[0].messages.push(message);
                angular.forEach(vm.messages[0].messages, function(v,k){
                    delete v.$$hashKey;
                    if(v.read==0){
                        count = count+1;
                    }else{
                        //
                    }
                    if(k == vm.messages[0].messages.length-1){
                        var data = {"messages": vm.messages[0].messages, "totalMessages":vm.messages[0].messages.length, "totalUnread": count};
                        console.log(data);
                        ChatsService.updateMessage(updateId,data).then(function (response) {
                            vm.message.messageText = '';
                        }, function(err){
                            console.log(angular.toJson(err));
                        });
                    }
                });
                
            }            
        }

        function getChat() {
            $ionicLoading.show({template: 'Loading Messages..'});
            //vm.messages = [];
            console.log(angular.toJson($stateParams.user));
            if (!$stateParams.user) {
                $ionicLoading.hide();
                $state.go('app.chats');
            } else {
                console.log(angular.toJson($stateParams.user + "  " + JSON.parse(localStorageService.get('authUser')).$id));
                ChatsService.getChat(JSON.parse(localStorageService.get('authUser')).$id, $stateParams.user).then(function (res) {
                    console.log(angular.toJson(res));                    
                    if(res.length>0){
                        console.log(JSON.stringify('1'));
                        vm.messages = res;
                        var updateId = vm.messages[0].$id;
                        angular.forEach(vm.messages[0].messages, function(msgval, msgkey){
                            console.log(angular.toJson(msgval));
                            console.log(msgval.messageTo+"  "+JSON.parse(localStorageService.get('authUser')).$id);
                            if(msgval.messageTo == JSON.parse(localStorageService.get('authUser')).$id){
                                msgval.read=1;
                            }else{
                               // 
                            }
                            if(msgkey == vm.messages[0].messages,length-1){
                                angular.forEach(vm.messages[0].messages, function(v,k){
                                   /* if(v.$$hashKey){
                                        delete v.$$hashKey;*/
                                        if(k == vm.messages[0].messages.length-1){
                                            if(v.messageTo == JSON.parse(localStorageService.get('authUser')).$id){
                                                var data = {"messages": vm.messages[0].messages, "totalMessages":vm.messages[0].messages.length, 
                                            "totalUnread":0};
                                            }else{
                                                var data = {"messages": vm.messages[0].messages, "totalMessages":vm.messages[0].messages.length};
                                            }
                                            
                                            console.log(data);
                                            ChatsService.updateMessage(updateId,data).then(function (response) {
                                                //showMessages();
                                            }, function(err){
                                                console.log(angular.toJson(err));
                                            });
                                        }else{
                                            //
                                        }
                                    /*}else{
                                        //
                                    }*/
                                });
                            }

                        });
                        $ionicLoading.hide();
                    }else{
                        $ionicLoading.hide();
                    }
                }, function (err) {
                    console.log(angular.toJson(err));
                    $ionicLoading.hide();
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
        function goBack(){
            window.location.reload();
            
        }
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
