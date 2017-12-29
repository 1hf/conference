(function () {
    'use strict';

    angular
            .module('conference.social')
            .controller('socialController', socialController);

    socialController.$inject = ['socialService', 'loginSignUpService', '$filter', '$state', '$interval', '$ionicPopover', '$cordovaCamera', '$ionicModal', '$ionicLoading', '$ionicListDelegate', 'localStorageService', 'filterModal', '_', '$scope', '$q'];

    /* @ngInject */
    function socialController(socialService, loginSignUpService, $filter, $state, $interval, $ionicPopover, $cordovaCamera, $ionicModal, $ionicLoading, $ionicListDelegate, localStorageService, filterModal, _, $scope, $q) {
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
            showMessageDetails: showMessageDetails,
            submitMessage: submitMessage,
            doRefresh: doRefresh,
            clickImage: clickImage,
            uploadImage: uploadImage,
            userId: null,
            userAvatar: null,
            msgLikes: msgLikes,
            commentsLikes: [],
            commentText: null,
            commentsLikesdata: {
                "messageId": '', 
                "likes":[], 
                "totalLikes":0, 
                "comments": [], 
                "totalComments": 0, 
                "addedDate": new Date(),
                "modifiedDate": new Date()
            },
            saveComment: saveComment
        });

        //*********************************************

        (function activate() {
            showMessages();
            //$q.all(getTypes(), getDates()).then(fetchChats);
        })()

        $scope.$on('$ionicView.enter', function () {

            //$q.all(getTypes(), getDates()).then(fetchChats);
        });
        /*$scope.$watch(vm.messages, function () {
            console.log('hey, myVar has changed!');
            showMessages();
        });*/
/*var starCountRef = firebase.database().ref('social');
starCountRef.on('value', function(snapshot) {
  showMessages();
});*/
// var starCountRef = firebase.database().ref('social');
// starCountRef.off();
//        $interval(function () {
//            showMessages();
//        }, 5000);

        function clickImage() {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                //sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                //allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 512,
                targetHeight: 512,
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
                quality: 80,
                destinationType: Camera.DestinationType.DATA_URL,
                //sourceType: Camera.PictureSourceType.CAMERA,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                //allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                //mediaType: Camera.MediaType.ALLMEDIA,
                targetWidth: 512,
                targetHeight: 512,
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
                messengerName: JSON.parse(localStorageService.get('authUser')).firstName+" "+JSON.parse(localStorageService.get('authUser')).lastName,
                messengerPic: JSON.parse(localStorageService.get('authUser')).avatar,
                messageTo: '',
                messageText: vm.message.messageText,
                pictureMessage: vm.message.pictureMessage,
                messageDate: now,
                isDeleted: false
            };
            //console.log(angular.toJson(message));
            return socialService.addMessage(message).then(function (response) {
                console.log(angular.toJson(response.path.o[1]));
                vm.message.messageText = '';
                vm.message.pictureMessage = '';
                vm.commentsLikesdata.messageId = response.path.o[1];
                return socialService.insertCommentsLikes(vm.commentsLikesdata).then(function (response) {
                    console.log(angular.toJson(response));                                
                    vm.commentsLikesdata.likes = [];
                    vm.commentsLikesdata.totalLikes = 0;                    
                });
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
        //CALCULATE Time difference START
                $scope.calcTime = function (dateString) {
                    var now = new Date();
                    var today = new Date(now.getYear(), now.getMonth(), now.getDate());

                    var yearNow = now.getYear();
                    var monthNow = now.getMonth();
                    var dateNow = now.getDate();
                    var hoursNow = now.getHours();
                    var minutesNow = now.getMinutes();

                    var dob = new Date(dateString);

                    var yearDob = dob.getYear();
                    var monthDob = dob.getMonth();
                    var dateDob = dob.getDate();
                    var hoursDob = dob.getHours();
                    var minutesDob = dob.getMinutes();
                    var age = {};
                    var ageString = "";
                    var yearString = "";
                    var monthString = "";
                    var dayString = "";
                    var hourString = "";
                    var minuteString = "";


                    var yearAge = yearNow - yearDob;

                    if (monthNow >= monthDob)
                        var monthAge = monthNow - monthDob;
                    else {
                        yearAge--;
                        var monthAge = 12 + monthNow - monthDob;
                    }

                    if (dateNow >= dateDob)
                        var dateAge = dateNow - dateDob;
                    else {
                        monthAge--;
                        var dateAge = 31 + dateNow - dateDob;

                        if (monthAge < 0) {
                            monthAge = 11;
                            yearAge--;
                        }
                    }

                    
                    age = {
                        years: yearAge,
                        months: monthAge,
                        days: dateAge
                    };

                    if (age.years > 1)
                        yearString = " years";
                    else
                        yearString = " year";
                    if (age.months > 1)
                        monthString = " months";
                    else
                        monthString = " month";
                    if (age.days > 1)
                        dayString = " days";
                    else
                        dayString = " day";
                    

                    if ((age.years > 0) && (age.months > 0) && (age.days > 0))
                        ageString = age.years + yearString +" , "+ age.months + monthString +" and "+ age.days + dayString + " old.";
                    else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
                        ageString = age.days + dayString + " ago!";
                    else if ((age.years > 0) && (age.months == 0) && (age.days == 0))
                        ageString = age.years + yearString + " ago!";
                    else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
                        ageString = age.years + yearString + " and " + age.months + monthString + " ago!";
                    else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
                        ageString = age.months + monthString + " and " + age.days + dayString + " ago!";
                    else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
                        ageString = age.years + yearString + " 0 months and " + age.days + dayString + " ago!";
                    else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
                        ageString = age.months + monthString + " ago.";
                    else                     
                        ageString = "Today!";
                    return ageString;
                };
        function addNamePic() {
            angular.forEach(vm.messages, function (val, key) {
                if(val.likes){
                    //
                }else{ 
                    val.likes = [];
                    val.totalLikes = 0
                }
                if(val.comments){
                    //
                }else{ 
                    val.comments = [];
                    val.totalComments = 0
                }
                val.messageDate = new Date(val.messageDate);
                val.timediff = $scope.calcTime(val.messageDate);
                var user = $filter('filter')(vm.users, {$id: val.messageFrom});
                console.log(user);
                val.messengerName = user[0].firstName+" "+user[0].lastName;
                val.messengerPic = user[0].avatar;

                /*vm.commentsLikesdata.messageId = val.$id;
                return socialService.insertCommentsLikes(vm.commentsLikesdata).then(function (response) {
                    console.log(angular.toJson(response));                                
                    vm.commentsLikesdata.likes = [];
                    vm.commentsLikesdata.totalLikes = 0;                    
                });*/

                /*var data = {"messengerName": val.messengerName, "messengerPic":val.messengerPic};
                socialService.updateMessage(val.$id,data).then(function (response) {
                    //showMessages();
                }, function(err){
                    console.log(angular.toJson(err));
                });*/

            });
        }
        function showMessages() {
            $ionicLoading.show({template: 'Loading messages...'});
            vm.userId = loginSignUpService.getStoredUser().$id;
            vm.userAvatar = loginSignUpService.getStoredUser().avatar;
            socialService.getMessages().then(function (messages) {
                //console.log(angular.toJson(messages));
                $ionicLoading.hide();
                if (!messages[0]) {
                    vm.noRecord = 'No messages.';
                } else {
                    vm.noRecord = '';
                    vm.messages = messages;

                    //addNamePic();
                   return socialService.fetchCommentsLikes().then(function (response) {
                        console.log(angular.toJson(response));
                        vm.commentsLikes = response;
                        angular.forEach(vm.messages, function(mval,mkey){
                            mval.messageDate = new Date(mval.messageDate);
                            mval.timediff = $scope.calcTime(mval.messageDate);
                            angular.forEach(vm.commentsLikes, function(cval,ckey){
                                if(mval.$id == cval.messageId){
                                    mval.commentsLikes = cval;
                                }else{
                                    //
                                }
                            });
                        });
                    });
                }
            }, function (err) {
                console.log(angular.toJson(err));
            });
        }
/*        function msgLikes(message) {
            console.log(angular.toJson(message));
            var updateId = message.$id;
                    if (message.likes.length > 0) {
                    var count = 0;
                    angular.forEach(message.likes, function (lv, lk) {
                        if (lv === vm.userId) {
                            message.likes.splice(lk, 1);                            
                            message.totalLikes = message.likes.length;
                            var data = {"likes": message.likes, "totalLikes":message.totalLikes, "modifiedDate": new Date()};
                            socialService.updateMessage(updateId,data).then(function (response) {
                                
                                showMessages();
                            }, function(err){
                                console.log(angular.toJson(err));
                            }); 
                        } else {
                            if (count === lk) {
                                message.likes.push(vm.userId);
                                message.totalLikes = message.likes.length;
                                var data = {"likes": message.likes, "totalLikes":message.totalLikes, "modifiedDate": new Date()};
                                socialService.updateMessage(updateId,data).then(function (response) {
                                    
                                    showMessages();
                                }, function(err){
                                    console.log(angular.toJson(err));
                                }); 
                            } else {
                                //  
                            }
                            count = count + 1;
                        }
                    });
                } else {
                    message.likes.push(vm.userId);
                    message.totalLikes = message.likes.length;
                    var data = {"likes": message.likes, "totalLikes":message.totalLikes, "modifiedDate": new Date()};
                    socialService.updateMessage(updateId,data).then(function (response) {
                        
                        showMessages();
                    }, function(err){
                        console.log(angular.toJson(err));
                    }); 
                }
        }*/

        function msgLikes(mid) {
            console.log(angular.toJson(mid));
            var mcount = 0;
            var ucount = 0;            
            if(vm.commentsLikes.length>0){
                console.log(angular.toJson(vm.commentsLikes));
                angular.forEach(vm.commentsLikes, function(clval, clkey){
                    if(clval.messageId == mid){
                        var updateId = clval.$id;
                        console.log('message id matches');
                        console.log(angular.toJson(clval));
                        if(clval.likes){
                            angular.forEach(clval.likes, function(cllval,cllkey){
                                console.log(cllval.likedBy +"   "+ JSON.parse(localStorageService.get('authUser')).$id);
                                if(cllval.likedBy == JSON.parse(localStorageService.get('authUser')).$id){
                                    console.log('user id matches at '+cllkey);
                                    console.log(angular.toJson(clval.likes));
                                    clval.likes.splice(cllkey,1);
                                    clval.totalLikes = clval.likes.length;
                                    console.log(updateId);
                                    if(clval.likes.length>0){
                                        var data = {"likes": clval.likes, "totalLikes":clval.totalLikes};
                                        console.log(angular.toJson(data));
                                    }else{
                                        var data = {"likes": [], "totalLikes":clval.totalLikes};
                                    }                                
                                    console.log(angular.toJson(data));
                                    socialService.updateLikesComments(updateId,data).then(function (response) {
                                        showMessages();
                                    }, function(err){
                                        console.log(angular.toJson(err));
                                    });
                                }else{
                                    clval.likes.push(
                                        {"likedBy": JSON.parse(localStorageService.get('authUser')).$id, 
                                        "likedByName": JSON.parse(localStorageService.get('authUser')).firstName+" "+JSON.parse(localStorageService.get('authUser')).lastName
                                        }
                                    );
                                    clval.totalLikes = clval.likes.length;
                                    var data = {"likes": clval.likes, "totalLikes":clval.totalLikes};
                                    console.log(angular.toJson(data));
                                    socialService.updateLikesComments(updateId,data).then(function (response) {
                                        showMessages();
                                    }, function(err){
                                        console.log(angular.toJson(err));
                                    });
                                }
                            });
                        }else{
                            clval.likes = [];
                            clval.likes.push(
                                {"likedBy": JSON.parse(localStorageService.get('authUser')).$id, 
                                "likedByName": JSON.parse(localStorageService.get('authUser')).firstName+" "+JSON.parse(localStorageService.get('authUser')).lastName
                                }
                            );
                            clval.totalLikes = clval.likes.length;
                            var data = {"likes": clval.likes, "totalLikes":clval.totalLikes};
                            socialService.updateLikesComments(updateId,data).then(function (response) {
                                showMessages();
                            }, function(err){
                                console.log(angular.toJson(err));
                            });
                        }                       

                    }else{
                        console.log('message id not matches');
                        if(mcount == vm.commentsLikes.length-1){
                            vm.commentsLikesdata.messageId = mid;
                            vm.commentsLikesdata.likes.push(
                                {"likedBy": JSON.parse(localStorageService.get('authUser')).$id, 
                                "likedByName": JSON.parse(localStorageService.get('authUser')).firstName+" "+JSON.parse(localStorageService.get('authUser')).lastName
                                }
                            );
                            vm.commentsLikesdata.totalLikes = vm.commentsLikesdata.likes.length;
                            return socialService.insertCommentsLikes(vm.commentsLikesdata).then(function (response) {
                                console.log(angular.toJson(response));                                
                                vm.commentsLikesdata.likes = [];
                                vm.commentsLikesdata.totalLikes = 0;                    
                            });
                        }else{
                            mcount = mcount+1;                            
                        }
                    }
                });           
            }else{
                vm.commentsLikesdata.messageId = mid;
                vm.commentsLikesdata.likes.push(
                    {"likedBy": JSON.parse(localStorageService.get('authUser')).$id, 
                    "likedByName": JSON.parse(localStorageService.get('authUser')).firstName+" "+JSON.parse(localStorageService.get('authUser')).lastName
                    }
                );
                vm.commentsLikesdata.totalLikes = vm.commentsLikesdata.likes.length;
                return socialService.insertCommentsLikes(vm.commentsLikesdata).then(function (response) {
                    console.log(angular.toJson(response));
                    vm.commentsLikesdata.likes = [];
                    vm.commentsLikesdata.totalLikes = 0;                   
                });
            }
        }



        $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

        $ionicPopover.fromTemplateUrl('options.html', {
          scope: $scope
        }).then(function(popover) {
          $scope.popover = popover;
        });
        $scope.openPopover = function($event,msg) {
          $scope.popover.show($event);
          //alert(angular.toJson(msg));
       };

       $scope.closePopover = function() {
          $scope.popover.hide();
       };

       //Cleanup the popover when we're done with it!
       $scope.$on('$destroy', function() {
          $scope.popover.remove();
       });

       // Execute action on hide popover
       $scope.$on('popover.hidden', function() {
          // Execute action
       });

       // Execute action on remove popover
       $scope.$on('popover.removed', function() {
          // Execute action
       });
        /*$ionicModal.fromTemplateUrl('templates/optionsModal.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.optionsmodal = modal;
            }); */           

            /*$scope.openModal = function (gal,pos) {
                console.log(angular.toJson(gal));
                $scope.socialComments = gal;
                $scope.modal.show();
                $scope.newComment = {
                    "comment": '',
                    "commentBy": loginSignUpService.getStoredUser().firstName,
                    "commentById": loginSignUpService.getStoredUser().$id,
                    "commentDate": new Date(),
                    "lastEdited": new Date(),
                    "isDeleted": "false",
                    "commentId": new Date().getTime()
                };
                if($scope.socialComments.comments){
                    //$scope.socialComments = gal;
                }else{
                    $scope.socialComments.comments = [];
                    $scope.socialComments.totalComments = 0;
                }
                
            };*/
            $scope.openModal = function (msg) {
                var ccount = 0;
                var mid = msg.$id;
                $scope.fullMessage = msg;
                console.log(mid);
                $scope.newComment = {
                    "comment": '',
                    "commentBy": loginSignUpService.getStoredUser().firstName,
                    "commentById": loginSignUpService.getStoredUser().$id,
                    "commentDate": new Date(),
                    "lastEdited": new Date(),
                    "isDeleted": "false",
                    "commentId": new Date().getTime()
                };
                angular.forEach(vm.commentsLikes, function(clval, clkey){
                    if(clval.messageId == mid){
                        $scope.socialComments = clval;
                        if(clval.comments){
                            //
                        }else{
                            $scope.socialComments.comments = [];
                        }
                    }else{
                        /*if(ccount == vm.commentsLikes.length-1){
                            $scope.socialComments,comments = [];
                        }else{
                            ccount = ccount+1;
                        }*/
                    }
                });                
                $scope.modal.show();               
                
            };
            /*$scope.showoptionsModal = function (msg) {                
                $scope.optionsmodal.show();
            };*/
        function saveComment() {            
            $scope.socialComments.comments.push($scope.newComment);
            var updateId = $scope.socialComments.$id;                                    
            var data = {"comments": $scope.socialComments.comments, "totalComments":$scope.socialComments.comments.length};
            socialService.updateLikesComments(updateId,data).then(function (response) {
                $scope.newComment.comment = '';
                //showMessages();
                $scope.modal.hide();
            }, function(err){
                console.log(angular.toJson(err));
            }); 
 

        }    
        function showMessageDetails(msgid) {
            console.log(msgid);
            $state.go('app.social-messages' , {id: msgid});
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
