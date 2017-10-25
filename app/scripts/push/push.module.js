(function() {
	'use strict';

	angular
		.module('conference.push', [
			'ionic',
			'ionic.cloud'
		])
		.run(function($ionicPlatform, $ionicPush) {
			$ionicPlatform.ready(function() {
				return $ionicPush.register().then(function(t) {
					return $ionicPush.saveToken(t);
				});
			});
		})
		.run(function($rootScope) {
			$rootScope.$on('cloud:push:notification', function(event, data) {
				var msg = data.message;
				alert(msg.title + ': ' + msg.text);
			});
		})
		.config(['$ionicCloudProvider', 'ENV', function($ionicCloudProvider, ENV) {
			// Identify app
			$ionicCloudProvider.init({
				"core": {
					"app_id": ENV.ionicAppId
				},
				"push": {
					"sender_id": ENV.gcmId,
					"pluginConfig": {
						"ios": {
							"badge": true,
							"sound": true
						},
						"android": {
							"iconColor": "#343434"
						}
					}
				}
			});
		}]);
})();
