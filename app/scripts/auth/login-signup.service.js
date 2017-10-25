(function() {
	'use strict';

	angular
		.module('conference.auth')
		.factory('loginSignUpService', loginSignUpService);

	loginSignUpService.$inject = ['$rootScope', '$firebaseAuth', 'db'];

	/* @ngInject */
	function loginSignUpService($rootScope, $firebaseAuth, db) {
		var firebaseAuth = firebase.auth();
		var auth = $firebaseAuth(firebaseAuth);

		var service = {
			user: {
				isSignedIn: false
			},
			signIn: signIn,
			signUp: signUp,
			logout: logout,
			getUser: getStoredUser
		};

		firebaseAuth.onAuthStateChanged(function(data) {
			if (!data) {
				setUser();
			} else {
				setUser(data.email);
			}
		});

		return service;

		// *******************************************************************

		function logout() {
			setUser();
			auth.$signOut();
			$rootScope.$emit('loggedOut');
		}

		function signUp(email, password) {
			return auth.$createUserWithEmailAndPassword(email, password).then(
				function(userData) {
					setUser(email);
					$rootScope.$emit('loggedIn');
					return userData;
				});
		}

		function signIn(email, password) {
			return auth.$signInWithEmailAndPassword(email, password).then(
				function(authData) {
					console.log('Logged in as:' + authData.uid);

					setUser(email);
					$rootScope.$emit('loggedIn');
					return authData;
				});
		}

		function setUser(email) {
			if (!email) {
				service.user.email = null;
				service.user.isSignedIn = false;
			} else {
				service.user.email = email;
				service.user.isSignedIn = true;
			}
			setStoredUser(service.user);
		}

		function getStoredUser() {
			var user = localStorage.getItem('authUser');
			if (user) {
				user = JSON.parse(user);
			}
			return user || { isSignedIn: false };
		}

		function setStoredUser(user) {
			if (user) {
				user = JSON.stringify(user);
			}
			localStorage.setItem('authUser', user);
		}
	}
})();