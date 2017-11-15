(function () {
    'use strict';

    angular
            .module('conference.auth')
            .controller('AccountController', AccountController);

    AccountController.$inject = ['$scope', '$ionicPopup', 'loginSignUpService', '$ionicLoading', '$cordovaCamera'];

    /* @ngInject */
    function AccountController($scope, $ionicPopup, loginSignUpService, $ionicLoading, $cordovaCamera) {
        var vm = angular.extend(this, {
            user : null,
            email: null,
            showChangePassword: false,
            currentPassword: null,
            newPassword: null,
            confirmNewPassword: null,
            avatar: null,
//            showPopup: showPopup,
            displayChangePassword: displayChangePassword,
            updatePassword: updatePassword,
//            uploadImage: uploadImage,
            logout: logout
        });

        (function activate() {
            getUser();
        })();
        
        function getUser() {
            vm.user = loginSignUpService.getStoredUser();
            vm.userId = loginSignUpService.getStoredUser().$id;
            console.log(angular.toJson(vm.user));
            console.log(angular.toJson(vm.userId));
            vm.email = loginSignUpService.getStoredUser().email;
            if(!vm.avatar){
               vm.avatar = 'http://www.gravatar.com/avatar?d=mm&s=140'; 
            }
            displayChangePassword(false);
            vm.currentPassword = '';
            vm.newPassword = '';
            vm.confirmNewPassword = '';
        }

        function displayChangePassword(value) {
            vm.showChangePassword = value;
        }

        function updatePassword() {
            $ionicLoading.show({template: 'Changing your password...'});
            if(loginSignUpService.getStoredUser().password===btoa(vm.currentPassword)){
                if (vm.newPassword !== vm.confirmNewPassword) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Invalid!',
                        template: 'New Password and Confirm New Password has to be same..'
                    });
                    vm.newPassword = null;
                    vm.confirmNewPassword = null;
                }else{
                    var data = {password: btoa(vm.newPassword)};
                    loginSignUpService.updateUser(vm.userId,data).then(function(res){
                        console.log(angular.toJson(res));
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Password Changed!',
                            template: 'Your password is changed successfully..'
                        });
                        vm.user.password = btoa(vm.newPassword);
                        loginSignUpService.setUser(vm.user);
                        console.log(angular.toJson(loginSignUpService.getStoredUser()));
                        getUser();
                    }, function(err){
                        $ionicLoading.hide();
                        console.log(angular.toJson(err));
                    });
                }
            }else{
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Invalid!',
                    template: 'Please enter the correct old Password..'
                });
            }
            
        }

        function uploadImage(type) {
            var source = '';
            vm.avatar = '';
            if (type == 'takePictue') {
                source = Camera.PictureSourceType.CAMERA;
            } else if (type == 'chooseImage') {
                source = Camera.PictureSourceType.PHOTOLIBRARY;
            }
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: source,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                vm.avatar = "data:image/jpeg;base64," + imageData;
                var data = {avatar: vm.avatar};
                loginSignUpService.updateUser(vm.userId,data).then(function(res){
                    console.log(angular.toJson(res));
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Password Changed!',
                        template: 'Your password is changed successfully..'
                    });
                });

            }, function (err) {
                alert(angular.toJson(err));
            });
        }

        function showPopup() {
            $ionicPopup.show({
                title: 'Upload Photo',
                cssClass: 'popup-pin',
                buttons: [
                    {text: '<i class="icon ion-camera"><p>Take Picture</p></i>',
                        type: 'button button-full button-positive',
                        onTap: function () {
                            vm.uploadImage('takePictue');
                        }
                    },
                    {text: '<i class="icon ion-image"><p>Choose Image</p></i>',
                        type: 'button button-full button-positive',
                        onTap: function () {
                            vm.uploadImage('chooseImage');
                        }
                    },
                    {text: '<i class="icon ion-close-circled"><p>Cancel</p></i>',
                        type: 'button button-full button-dark',
                        onTap: function (e) {

                        }
                    }
                ]
            });
        }

        function logout() {
            loginSignUpService.logout();
        }
    }
})();
//
//
//(function () {
//    'use strict';
//
//    angular
//            .module('conference.auth')
//            .controller('AccountController', AccountController);
//
//    AccountController.$inject = ['$scope', '$ionicPopup', 'loginSignUpService', '$cordovaCamera'];
//
//    /* @ngInject */
//    function AccountController($scope, $ionicPopup, loginSignUpService, $cordovaCamera) {
//        var vm = angular.extend(this, {
//            email: null,
//            showChangePassword: false,
//            currentPassword: null,
//            newPassword: null,
//            confirmNewPassword: null,
//            avatar: null,
//            showPopup: showPopup,
//            displayChangePassword: displayChangePassword,
//            updatePassword: updatePassword,
//            uploadImage: uploadImage,
//            logout: logout
//        });
//
//        (function activate() {
//            getUser()
//        })();
//
//        function getUser() {
//            vm.email = loginSignUpService.getStoredUser().email;
//            vm.avatar = 'http://www.gravatar.com/avatar?d=mm&s=140';
//        }
//
//        function displayChangePassword(value) {
//            vm.showChangePassword = value;
//        }
//
//        function updatePassword() {
//            if (vm.newPassword != vm.confirmNewPassword) {
//                $ionicPopup.alert({
//                    title: 'Invalid!',
//                    template: 'New Password and Confirm New Password has to be same..'
//                });
//                vm.newPassword = null;
//                vm.confirmNewPassword = null;
//            }
//        }
//
//        function uploadImage(type) {
//            var source = '';
//            vm.avatar = '';
//            if (type == 'takePictue') {
//                source = Camera.PictureSourceType.CAMERA;
//            } else if (type == 'chooseImage') {
//                source = Camera.PictureSourceType.PHOTOLIBRARY;
//            }
//            var options = {
//                quality: 100,
//                destinationType: Camera.DestinationType.DATA_URL,
//                sourceType: source,
//                allowEdit: true,
//                encodingType: Camera.EncodingType.JPEG,
//                targetWidth: 100,
//                targetHeight: 100,
//                popoverOptions: CameraPopoverOptions,
//                saveToPhotoAlbum: false,
//                correctOrientation: true
//            };
//
//            $cordovaCamera.getPicture(options).then(function (imageData) {
//                vm.avatar = "data:image/jpeg;base64," + imageData;
//
//            }, function (err) {
//                alert(angular.toJson(err));
//            });
//        }
//
//        function showPopup() {
//            $ionicPopup.show({
//                title: 'Upload Photo',
//                cssClass: 'popup-pin',
//                buttons: [
//                    {text: '<i class="icon ion-camera"><p>Take Picture</p></i>',
//                        type: 'button button-full button-positive',
//                        onTap: function () {
//                            vm.uploadImage('takePictue');
//                        }
//                    },
//                    {text: '<i class="icon ion-image"><p>Choose Image</p></i>',
//                        type: 'button button-full button-positive',
//                        onTap: function () {
//                            vm.uploadImage('chooseImage');
//                        }
//                    },
//                    {text: '<i class="icon ion-close-circled"><p>Cancel</p></i>',
//                        type: 'button button-full button-dark',
//                        onTap: function (e) {
//
//                        }
//                    }
//                ]
//            });
//        }
//
//        function logout() {
//            loginSignUpService.logout();
//        }
//    }
//})();