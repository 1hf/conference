// Ionic conference App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'conference' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'conference.controllers' is found in controllers.js
angular.module('conference', [
	'ionic',
	'firebase',
	'ionic.service.core',
	'config',
	'LocalStorageModule',
	'ion-datetime-picker',
	'ionic.service.push',
	'gMaps',
	'ngCordova',
	'conference.common',
	'conference.menu',
	'conference.schedule',
	'conference.map',
	'conference.speakers',
	'conference.places',
	'conference.auth',
	'conference.tutorial',
	'conference.abstracts',
	'conference.events',
	'conference.committees',
	'conference.sponsors',
	'conference.push',
	'gMaps',
	'ngCordova'
])

	.value('_', window._)

	.run(function($ionicPlatform) {
		$ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)

			if (window.cordova && window.cordova.plugins.Keyboard) {
				window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		});
	})
	.run(function($rootScope) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			$rootScope.hideTabs = !!toState.hideTabs;
		});
	})

	.config(function($urlRouterProvider, $compileProvider) {
		$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
		$urlRouterProvider.otherwise('/app/tab/schedule');
	});
