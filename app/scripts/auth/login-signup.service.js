(function () {
    'use strict';

    angular
            .module('conference.auth')
            .factory('loginSignUpService', loginSignUpService);

    loginSignUpService.$inject = ['$rootScope', '$firebaseAuth', 'db', 'dataService', '$http'];

    /* @ngInject */
    function loginSignUpService($rootScope, $firebaseAuth, db, dataService, $http) {
//		var firebaseAuth = firebase.auth();
//		var auth = $firebaseAuth(firebaseAuth);

        var service = {
            user: {
                isSignedIn: false
            },
//            signIn: signIn,
            login: login,
            loginMobile: loginMobile,
            logout: logout,
            getStoredUser: getStoredUser,
            getUserDetails: getUserDetails,
            getUsers: getUsers,
            insertUser: insertUser,
            updateUser: updateUser,
            setUser: setUser,
            sendSMS: sendSMS
        };

//		firebaseAuth.onAuthStateChanged(function(data) {
//			if (!data) {
//				setUser();
//			} else {
//				setUser(data.email);
//			}
//		});

        return service;

        // *******************************************************************

        function logout() {
            setUser();
            //auth.$signOut();
            $rootScope.$emit('loggedOut');
            return true;
        }

        function getUserDetails(user) {
            return dataService.getUser(user);
        }
        function getUserMobile(user) {
            return dataService.getUserMobile(user);
        }
        function getUsers() {
            return dataService.getUsers();
        }
        function insertUser(user) {
            return dataService.insertUser(user);
        }
        function updateUser(updateId, data) {
            var collection = "user";
            return dataService.update(updateId, data, collection);
        }

//		function signUp(email, password) {
//			return auth.$createUserWithEmailAndPassword(email, password).then(
//				function(userData) {
//					setUser(email);
//					$rootScope.$emit('loggedIn');
//					return userData;
//				});
//		}

//		function signIn(email, password) {
//			return auth.$signInWithEmailAndPassword(email, password).then(
//				function(authData) {
//					console.log('Logged in as:' + authData.uid);
//
//					setUser(email);
//					$rootScope.$emit('loggedIn');
//					return authData;
//				});
//		}

        function login(userName, password) {
            console.log('email');
            console.log(userName + '  ' + password);
            var flag;
            return getUserDetails(userName).then(function (response) {
                console.log(angular.toJson(response));
//                if(!response.$value){
                    angular.forEach(response, function (v, k) {
                        console.log(angular.toJson(v + "  " + k));
                        v.$id = k;
                        console.log(angular.toJson(v));
                        if ((userName == v.email || userName == v.mobileNumber) && v.password === btoa(password)) {
                            setUser(v);
                            flag = v;
                        } else {
                            setUser('');
                            flag = '';
                        }
                    });
                    return flag;
//                }else if(response.$value==null){
//                    console.log('mobile');
//                    var u = parseInt(userName);
//                   loginMobile(u, password); 
//                }
                
                
            });
        }
        
        function loginMobile(userName, password) {
            console.log('Mobile');
            console.log(userName + '  ' + password);
            var flag;
            return getUserMobile(userName).then(function (response) {
                console.log(angular.toJson(response));
                    angular.forEach(response, function (v, k) {
                        console.log(angular.toJson(v + "  " + k));
                        v.$id = k;
                        console.log(angular.toJson(v));
                        if ((userName == v.email || userName == v.mobileNumber) && v.password === btoa(password)) {
                            setUser(v);
                            flag = v;
                        } else {
                            setUser('');
                            flag = '';
                        }
                    });
                    return flag;
                              
                
            });
        }

        function setUser(data) {
            if (!data) {
                service.user.email = null;
                service.user.isSignedIn = false;
            } else {
                service.user = data;
                service.user.isSignedIn = true;
            }
            setStoredUser(service.user);
        }

        function getStoredUser() {
            var user = localStorage.getItem('authUser');
            if (user) {
                user = JSON.parse(user);
            }
            return user || {isSignedIn: false};
        }

        function setStoredUser(user) {
            if (user) {
                user = JSON.stringify(user);
            }
            localStorage.setItem('authUser', user);
        }

        function sendSMS(number, message) {
            var KEY = 'Ad2abf667677b7a748622a07ff29ca545';
            var APIURL = 'https://alerts.solutionsinfini.com';
            var senderId = 'ONEHLT';

            return $http.post(APIURL + '/api/v3/index.php?method=sms&api_key=' + KEY + '&to=' + number + '&sender=' + senderId + '&message=' + message).then(function (resp) {
                console.log(resp);
                return resp;
            });
        }

    }
})();