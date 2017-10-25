(function() {
	'use strict';

	angular
		.module('conference.common')
		.factory('dataService', dataService);

	dataService.$inject = ['ENV', '$injector'];

	/* @ngInject */
	function dataService(ENV, $injector) {
		switch(ENV.dataProvider) {
			case 'LOCAL':
				return $injector.get('fileDataService');
			case 'REMOTE':
				return $injector.get('fileDataService');
			case 'FIREBASE':
				return $injector.get('firebaseDataService');
		}

		throw new Error('Data provider is not valid');
	}
})();
