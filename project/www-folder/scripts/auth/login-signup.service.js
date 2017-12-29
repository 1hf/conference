(function () {
    'use strict';

    angular
            .module('conference.auth')
            .factory('loginSignUpService', loginSignUpService);

    loginSignUpService.$inject = ['$rootScope', '$firebaseAuth', 'db', 'dataService', '$http', 'localStorageService'];

    /* @ngInject */
    function loginSignUpService($rootScope, $firebaseAuth, db, dataService, $http, localStorageService) {
//		var firebaseAuth = firebase.auth();
//		var auth = $firebaseAuth(firebaseAuth);

        var service = {
            user: {
                isSignedIn: false
            },
//            signIn: signIn,
            login: login,
            loginMobile: loginMobile,
            upload: upload,
            logout: logout,
            getStoredUser: getStoredUser,
            getUserDetails: getUserDetails,
            getUserMobile: getUserMobile,
            getUsers: getUsers,
            getmoreUsers: getmoreUsers,
            getusersData: getusersData,
            insertUser: insertUser,
            updateUser: updateUser,
            setUser: setUser
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
        function getUsers(start) {
            return dataService.getUsers(start);
        }
        function getmoreUsers(k) {
            console.log(k);
            return dataService.getmoreUsers(k);
        }
        function getusersData(start) {
            return dataService.getusersData(start);
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

        function upload(data, collection) {
            return dataService.uploadData(data, collection);
        }

        function login(userName) {
            console.log('email');
            console.log(userName);
            var flag;
            return getUserDetails(userName).then(function (response) {
                console.log(angular.toJson(response));
                angular.forEach(response, function (v, k) {
                    v.$id = k;
                    console.log(angular.toJson(v));
                    if (userName == v.email) {
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

        function loginMobile(userName) {
            console.log('Mobile');
            console.log(userName);
            var flag;
            return getUserMobile(userName).then(function (response) {
                console.log(angular.toJson(response));
                angular.forEach(response, function (v, k) {
                    console.log(angular.toJson(v + "  " + k));
                    v.$id = k;
                    console.log(angular.toJson(v));
                    if (userName == v.mobileNumber) {
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
            var user = localStorageService.get('authUser');
            if (user) {
                user = JSON.parse(user);
            }
            return user || {isSignedIn: false};
        }

        function setStoredUser(user) {
            if (user) {
                user = JSON.stringify(user);
            }
            localStorageService.set('authUser', user);
        }

//        function sendSMS(number, message) {
//            var KEY = 'Ad2abf667677b7a748622a07ff29ca545';
//            var APIURL = 'https://alerts.solutionsinfini.com';
//            var senderId = 'ONEHLT';
//
//            return $http.post(APIURL + '/api/v3/index.php?method=sms&api_key=' + KEY + '&to=' + number + '&sender=' + senderId + '&message=' + message).then(function (resp) {
//                console.log(resp);
//                return resp;
//            });
//        }

    }
})();