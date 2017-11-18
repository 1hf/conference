(function () {
    'use strict';

    angular
            .module('conference.auth')
            .controller('AccountController', AccountController);

    AccountController.$inject = ['$scope', '$ionicPopup', 'loginSignUpService', '$ionicLoading', '$cordovaCamera'];

    /* @ngInject */
    function AccountController($scope, $ionicPopup, loginSignUpService, $ionicLoading, $cordovaCamera) {
        var vm = angular.extend(this, {
            user: null,
            email: null,
            showChangePassword: false,
            currentPassword: null,
            newPassword: null,
            confirmNewPassword: null,
            avatar: null,
            displayImageUploadOptions: displayImageUploadOptions,
            displayChangePassword: displayChangePassword,
            updatePassword: updatePassword,
            uploadImage: uploadImage,
            updateProfile: updateProfile,
            logout: logout
        });

        (function activate() {
            getUser();
        })();

        function getUser() {
            vm.user = loginSignUpService.getStoredUser();
            vm.userId = loginSignUpService.getStoredUser().$id;
            console.log(angular.toJson(vm.userId));
            vm.email = loginSignUpService.getStoredUser().email;
            if (vm.user.avatar) {
                vm.avatar = vm.user.avatar;
            } else {
                vm.avatar = 'http://www.gravatar.com/avatar?d=mm&s=140';
            }
            vm.displayImageUploadOptions(false);
            displayChangePassword(false);
            vm.currentPassword = '';
            vm.newPassword = '';
            vm.confirmNewPassword = '';
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
                loginSignUpService.updateUser(vm.userId, data).then(function (res) {
                    console.log(angular.toJson(res));
                    vm.user.avatar = vm.avatar;
                    loginSignUpService.setUser(vm.user);
                    console.log(angular.toJson(loginSignUpService.getStoredUser()));
                    getUser();
                });
            }, function (err) {
                alert(angular.toJson(err));
            });
        }
        
        function updateProfile(){
            $ionicLoading.show({template: 'Updating profile details...'});
            var data = {firstName:vm.user.firstName, lastName:vm.user.lastName, avatar:vm.user.avatar, 
                mobileNumber:vm.user.mobileNumber, email:vm.user.email, designation:vm.user.designation, 
                address:{Address1: vm.user.address.Address1, City: vm.user.address.City, State: vm.user.address.State,
                zipCode: vm.user.address.zipCode}};
            loginSignUpService.updateUser(vm.userId, data).then(function (res) {
                $ionicLoading.hide();
                console.log(angular.toJson(res));
                loginSignUpService.setUser(vm.user);
                console.log(angular.toJson(loginSignUpService.getStoredUser()));
                getUser();
                $ionicPopup.alert({
                title: 'Success!',
                template: 'Profile Updated Successfully..'
                });
                
            }, function(err){
                console.log(angular.toJson(err));
                $ionicPopup.alert({
                title: 'Error',
                template: 'Error Updating Profile. Try again..'
                });
                $ionicLoading.hide();
            });
        }
        function updatePassword() {
            $ionicLoading.show({template: 'Changing your password...'});
            if (loginSignUpService.getStoredUser().password === btoa(vm.currentPassword)) {
                if (vm.newPassword !== vm.confirmNewPassword) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Invalid!',
                        template: 'New Password and Confirm New Password has to be same..'
                    });
                    vm.newPassword = null;
                    vm.confirmNewPassword = null;
                } else {
                    var data = {password: btoa(vm.newPassword)};
                    loginSignUpService.updateUser(vm.userId, data).then(function (res) {
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
                    }, function (err) {
                        $ionicLoading.hide();
                        console.log(angular.toJson(err));
                    });
                }
            } else {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Invalid!',
                    template: 'Please enter the correct old Password..'
                });
            }
        }

        function displayImageUploadOptions(value) {
            vm.showImageUploadOptions = value;
        }

        function displayChangePassword(value) {
            vm.showChangePassword = value;
        }

        function logout() {
            loginSignUpService.logout();
        }
    }
})();