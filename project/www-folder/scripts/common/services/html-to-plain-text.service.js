(function() {
	'use strict';

	angular
		.module('conference.common')
		.factory('htmlToPlainText', htmlToPlainText);

	htmlToPlainText.$inject = [];

	/* @ngInject */
	function htmlToPlainText() {
		return function(text) {
			return String(text).replace(/<[^>]+>/gm, '');
		};
	}
})();
