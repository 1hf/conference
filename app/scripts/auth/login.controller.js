(function () {
    'use strict';

    angular
            .module('conference.auth')
            .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', '$ionicLoading', 'loginSignUpService', '$ionicPopup', '$rootScope'];

    /* @ngInject */
    function LoginController($state, $ionicLoading, loginSignUpService, $ionicPopup, $rootScope) {
        var vm = angular.extend(this, {
            user: {
                userName: null,
                password: null,
                mobileNumber: null
            },
            showLogin: true,
            showReset: false,
            loginUser: loginUser,
            uploadData: uploadData,
            gotoSignUp: gotoSignUp,
            displayReset: displayReset,
            displayLogin: displayLogin,
            resetPassword: resetPassword
        });
        //
        console.log(angular.toJson(localStorage.getItem('authUser')));
        if(JSON.parse(localStorage.getItem('authUser')).isSignedIn){
            $ionicLoading.show({template: 'Logging you in...'});
            $state.go('app.tabs.schedule');            
        }else{
            //
        }
//        var speakerData = [
//{
//  "firstName" : "Dr. Peter",
//  "lastName": "Slinger",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Ronald",
//  "lastName": "D Miller",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Gentle",
//  "lastName": "S Shrestha",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Prof. Ravi",
//  "lastName": "Mahajan",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Venugopal",
//  "lastName": "S Reddy",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Abhijit",
//  "lastName": "Biswas",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Priya",
//  "lastName": "R Menon",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Giuseppe",
//  "lastName": "A Marraro",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Eric",
//  "lastName": "Hodgson",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Bhavani Shankar",
//  "lastName": "Kodali",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Swapna",
//  "lastName": "Chaudhury",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Kallol",
//  "lastName": "Chaudhury",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Devendra",
//  "lastName": "Tilak",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Jayaram",
//  "lastName": "Dasan",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Bandana",
//  "lastName": "Paudel",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Prof. Dr. C. R. DAS",
//  "lastName": "",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Tarit",
//  "lastName": "Saha",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Farhan",
//  "lastName": "Husain",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Kaushik",
//  "lastName": "Dasgupta",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//},
//{
//  "firstName" : "Dr. Ashish",
//  "lastName": "Sinha",
//  "education" : "",
//  "about" : "",
//  "profilePic" : "images/watermark.png",
//  "address": {"Address1":"","City":"","State":"","zipCode":""},
//  "email" : "",
//  "phoneNumber":"",
//  "academicAppointment": "",
//  "areasInterest": "",
//  "ongoingResearch": "",
//  "publications": "",
//  "achievements": ""
//}
//];
//        function uploadData() {
//            console.log('speakerData upload');
//            angular.forEach(speakerData, function(v,k){
//                loginSignUpService.insertSpeaker(v).then(function(res){
//                    console.log(angular.toJson(res));
//                    console.log(k+" records uploaded");
//                }, function(err){
//                    
//                });
//            });
//        }
        function loginUser() {
            if (vm.user.userName && vm.user.password) {
                $ionicLoading.show({template: 'Logging you in...'});
                loginSignUpService.login(vm.user.userName, vm.user.password).then(
                        function (res) {
                            console.log(angular.toJson(res));
                            if (res) {
                                $ionicLoading.hide();
                                $rootScope.$emit('loggedIn');
                                $state.go('app.tabs.schedule');
                            } else {
                                loginSignUpService.loginMobile(parseInt(vm.user.userName), vm.user.password).then(function(res){
                                    if (res) {
                                        $ionicLoading.hide();
                                        $rootScope.$emit('loggedIn');
                                        $state.go('app.tabs.schedule');
                                    } else {
                                        $ionicLoading.hide();
                                        $ionicPopup.alert({
                                            title: 'Invalid User Credentials!',
                                            template: 'Kindly enter a valid username and password.'
                                        });
                                    }                                    
                                }, function(err){
                                    $ionicLoading.hide();
                                    $ionicPopup.alert({
                                        title: 'Invalid User Credentials!',
                                        template: 'Kindly enter a valid username and password.'
                                    });
                                });
                            }
                        }, function (error) {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'Invalid User Credentials!',
                                template: 'Kindly enter a valid username and password.'
                            });
                        });
            } else {
                $ionicPopup.alert({
                    title: 'Invalid!',
                    template: 'Kindly enter your username and password.'
                });
            }
        }

        function gotoSignUp() {
            vm.user.userName = null;
            vm.user.password = null;
            $state.go('app.signup');
        }

        function displayReset() {
            vm.user.password = null;
            vm.showLogin = false;
            vm.showReset = true;
        }

        function displayLogin() {
            vm.user.mobileNumber = null;
            vm.showReset = false;
            vm.showLogin = true;
        }

        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i)
                result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }

        function resetPassword() {
            if (vm.user.userName && vm.user.mobileNumber) {
                var randomStringChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@$%*&^!()';
                var randomPassword = randomString(10, randomStringChars);
                loginSignUpService.getUserDetails(vm.user.userName).then(function (response) {
                    if (angular.toJson(response.$value)) {
                        $ionicPopup.alert({
                            title: 'Invalid!',
                            template: 'Kindly enter a valid username.'
                        });
                    } else {
                        angular.forEach(response, function (v, k) {
                            console.log(angular.toJson(v + "  " + k));
                            v.$id = k;
                            console.log(angular.toJson(v));
                            var message = 'Dear ' + v.firstName + ' ' + v.lastName + ', your password has been reset to ' + randomPassword + '.';
                            loginSignUpService.sendSMS(vm.user.mobileNumber, message).then(function (res) {
                                console.log('SUCCESS ' + JSON.stringify(res));
                            }, function (err) {
                                console.log('ERROR ' + JSON.stringify(err));
                            });
                            var data = {password: btoa(randomPassword)};
                            loginSignUpService.updateUser(v.$id, data).then(function (res) {
                                console.log(angular.toJson(res));
                                $ionicPopup.alert({
                                    title: 'Success!',
                                    template: 'Password Reset successfully. You will receive the new password in your mobile number.'
                                });
                            }, function (err) {
                                console.log(angular.toJson(err));
                            });
                        });
                    }
                });
            } else {
                $ionicPopup.alert({
                    title: 'Invalid!',
                    template: 'Kindly enter your username and mobile number.'
                });
            }
        }
    }
})();