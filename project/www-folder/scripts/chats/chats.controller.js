(function () {
    'use strict';

    angular
            .module('conference.chats')
            .controller('ChatsController', ChatsController);

    ChatsController.$inject = ['ChatsService', '$state', '$filter', '$ionicListDelegate', 'filterModal', '_', '$scope', '$q', '$ionicLoading', 'loginSignUpService', 'localStorageService', '$ionicPopover'];

    /* @ngInject */
    function ChatsController(ChatsService, $state, $filter, $ionicListDelegate, filterModal, _, $scope, $q, $ionicLoading, loginSignUpService, localStorageService, $ionicPopover) {
        var vm = angular.extend(this, {
            key: { key: null },
            chats: [],
            users: [],
            filter: null,
            newUser: null,
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
            showAll: showAll,
            loadMore: loadMore,
            searchUser: searchUser
        });
        $scope.newUsers = [];
        
        (function activate() {
            //fetchUsers();
            $scope.lastKey = '';
            getusersData();
            var ref = firebase.database().ref("chatMessages");
            firebase.database().ref().on('value', function (snapshot) {
                getusersData();
            });
           
        })()
        

        function getusersData() {
            $scope.newUsers = [];
            $ionicLoading.show({template: 'Loading Messages'});
            var myId = JSON.parse(localStorageService.get('authUser')).$id;
            console.log(myId);
            return ChatsService.getChats(myId).then(function (items) {
                console.log(angular.toJson(items));
                console.log(angular.toJson(items.length));
                if(items.length>0){
                    angular.forEach(items, function(itemval, itemkey){
                        var count = 0;
                        console.log(itemval);
                        angular.forEach(itemval.messages, function(v,k){
                            if(v.messageTo == JSON.parse(localStorageService.get('authUser')).$id && v.read==0){
                                count = count+1;
                            }else{
                               // 
                            }
                            if(k == itemval.messages.length-1){
                                itemval.totalUnread = count;
                                if(itemval.messageFrom == myId){
                                   ChatsService.getUserId(itemval.messageTo).then(function(res){
                                    console.log(angular.toJson(res));
                                       // itemval.user = res;
                                       res.message = itemval;                           
                                        $scope.newUsers.push(res);
                                   });
                                }
                                if(itemval.messageTo == myId){
                                   ChatsService.getUserId(itemval.messageFrom).then(function(res){
                                    console.log(angular.toJson(res));
                                       // itemval.user = res;
                                       res.message = itemval;
                                        $scope.newUsers.push(res);
                                   });
                                }
                            }
                        });


                        $ionicLoading.hide();
                    });
                }else{
                    $ionicLoading.hide();
                }
                
            });
        
        
        }
        $ionicPopover.fromTemplateUrl('newUser.html', {
          scope: $scope
        }).then(function(popover) {
          $scope.popover = popover;
        });
        $scope.openPopover = function($event) {
          $scope.popover.show($event);
          //alert(angular.toJson(msg));
       };
       $scope.closePopover = function() {
          $scope.popover.hide();
       };
       function searchUser(){        
        var count = 0;
        $scope.error = "";
        if((vm.newUser.toString()).length==10){
            if(JSON.parse(localStorageService.get('authUser')).mobileNumber!==vm.newUser){
                $ionicLoading.show({template: 'Loading Users'});          
                return ChatsService.getUser(vm.newUser).then(function (users) {
                    console.log(users);
                    if(!users.$value){
                        //$scope.newUsers = [];
                        angular.forEach(users, function(val,key){
                            console.log(val);
                            val.$id = key;
                            val.message={};
                            angular.forEach($scope.newUsers, function(uval,ukey){
                                console.log(val.$id+"  "+uval.$id);
                                if(val.$id===uval.$id){
                                    //
                                }else{
                                    count = count+1;
                                    if(ukey === $scope.newUsers.length-1 && count === $scope.newUsers.length){
                                        $scope.newUsers.push(val);
                                        vm.newUser = "";
                                    }
                                }
                            });
                            if($scope.newUsers.length<1){
                                $scope.newUsers.push(val);
                            }                            
                            //$scope.newUsers.$id = key;
                            $ionicLoading.hide();
                            $scope.error = "";
                            $scope.popover.hide();
                        });
                        
                    }
                    if(users.$value==null){
                        $scope.error = 'No User Found..';
                        $ionicLoading.hide();
                    }

                    //$scope.newUsers.splice(0,0, users);
                    //console.log(angular.toJson($scope.newUsers));
                }) 
            }else{
                $ionicLoading.hide();
                $scope.error = "You Cannot chat with yourself.. :)";
                //alert('You Cannot chat with yourself.. :)');
            } 


        }
       }
        function loadMore(k){
            $ionicLoading.show({template: 'Loading more Users'});
            console.log(k);
            loginSignUpService.getmoreUsers(k).then(function(result){
                    console.log(result);    
            angular.forEach(result, function(v,k){
                if(k<result.length-1){
                  vm.users.push(v);  
                }
                    vm.key.key = v.$id;
                    console.log(vm.key.key);
            });
            $ionicLoading.hide();
        });
        }
        function fetchUsers() {            
           // $ionicLoading.show({template: 'Loading Users'});
            //loginSignUpService.getUsers(0).then(function (res) {
            loginSignUpService.getUsers(0).then(function (res) {
                vm.users = res;
               // $ionicLoading.hide();

            });
        }

        function goToChatsMessages(user) { console.log(angular.toJson(user));
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
