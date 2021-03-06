(function() {
	'use strict';

	angular
		.module('conference.common')
		.factory('externalAppsService', externalAppsService);

	externalAppsService.$inject = ['$window'];

	/* @ngInject */
	function externalAppsService($window) {
		var service = {
			openMapsApp: openMapsApp,
			openPdf: openPdf,
			openExternalUrl: openExternalUrl
		};
		return service;

		// ******************************************************

		function openMapsApp(coords) {
			var q;
			if (ionic.Platform.isAndroid()) {
				q = 'geo:' + coords + '?q=' + coords;
			} else {
				q = 'maps://maps.apple.com/?q=' + coords;
			}
			q = q.replace(' ', '');
			$window.location.href = q;
		}

		function openPdf(url) {
			openExternalUrl(url);
		}

		function openExternalUrl(url) {
			$window.open(url, '_system', 'location=yes');
			return false;
		}
	}
})();
