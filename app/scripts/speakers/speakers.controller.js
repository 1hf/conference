(function() {
	'use strict';

	angular
		.module('conference.speakers') 
		.controller('SpeakersController', SpeakersController);

	SpeakersController.$inject = ['$state', 'speakersService'];

	/* @ngInject */
	function SpeakersController($state, speakersService) {
		var vm = angular.extend(this, {
			speakers: [],
			goToSpeakerDetail: goToSpeakerDetail
		});

		//*********************************************

		(function activate() {
			getSpeakers()
		})();

		function getSpeakers() {
			speakersService.getSpeakers().then(function(items) {
				vm.speakers = items;
			})
		}

		// function goToSessionDetail(session) {
		// 	return scheduleService.setSession(session)
		// 		.then($state.go('app.tabs.speakers-session-details'));
		// }

		function goToSpeakerDetail(speaker) {
			$state.go('app.tabs.speakers-speaker-details', {
				speakerId: speaker.$id
			})
		}
	}
})();
