(function() {
	'use strict';

	angular
		.module('conference.auth')
		.controller('SignupController', SignupController);

	SignupController.$inject = ['$state', '$ionicPopup', '$ionicLoading', 'loginSignUpService'];

	/* @ngInject */
	function SignupController($state, $ionicPopup, $ionicLoading, loginSignUpService) {
		var vm = angular.extend(this, {
			user: {
                                firstName: null,
                                lastName: null,
                                email: null,
                                mobileNumber: null,
				password: null,
                                designation: null
			},
			signIn: signIn,
                        insertUser: insertUser,
                        goBack: goBack
		});

		function signIn() {
                    $ionicLoading.show({template: 'Signing up you in...'});
                    vm.user.userName = vm.user.email;                    
                    console.log(angular.toJson(vm.user));
                    
                    loginSignUpService.getUsers().then(function(res){
                        console.log(angular.toJson(res));
                        var count = 0;
                        if(res[0]){
                            angular.forEach(res, function(val,key){
                                if(val.email===vm.user.email || val.mobileNumber === vm.user.mobileNumber){
                                    $ionicLoading.hide();
                                    vm.message = 'User With same Email / Mobile exists.';
                                }else{
                                    if(count === res.length-1){
                                       insertUser(); 
                                    }else{
                                       count = count+1; 
                                    }
                                }
                            });
                        }else{
                           insertUser(); 
                        }
                    });
                    
//			if (vm.user.email && vm.user.password) {
//				$ionicLoading.show({});
//				loginSignUpService.signUp(vm.user.email, vm.user.password).then(
//					function() {
//						$ionicLoading.hide();
//					},
//					function(error) {
//						$ionicLoading.hide();
//						alert('Authentication failed:' + error.message);
//					});
//			} else {
//				alert('Please enter email and password both');
//			}
		}
                function insertUser(){
                    vm.user.password = btoa(vm.user.password);
                    loginSignUpService.insertUser(vm.user).then(function(res){
                        console.log(angular.toJson(res));
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Success..',
                            template: 'Signup successful. Redirecting to Login.'
                        });
                        vm.message = '';
                        $state.go('app.signin');
                    }, function(err){
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Error Occured',
                            template: 'Error Occured. Kindly try again.'
                        });
                        console.log(angular.toJson(err));
                    });
                }
                
                function goBack(){
                    $state.go('app.signin');
                }
	}
})();