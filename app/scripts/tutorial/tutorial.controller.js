(function() {
	'use strict';

	angular
		.module('conference.tutorial')
		.controller('TutorialController', TutorialController);

	TutorialController.$inject = ['$state'];

	/* @ngInject */
	function TutorialController($state) {
		var vm = angular.extend(this, {
			slides: null,
			options: {
				loop: false,
				speed: 500
			},
			startApp: startApp
		});

		// ********************************************************************

		(function activate() {
			getSlides()
		})();

		function getSlides() {
			vm.slides = [
				{
					title: '<b>ICA 2017</b>',
					description: '22-27 May<br>New York, United States',
					image: 'images/ica-slidebox-img-1.png',
				},
				{
					title: 'What is Ionic?',
					description: '<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.',
					image: 'images/ica-slidebox-img-2.png',
				},
				{
					title: 'What is Ionic Platform?',
					description: 'The <b>Ionic Platform</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.',
					image: 'images/ica-slidebox-img-3.png',
				}
			];
		}

		function startApp() {
			$state.go('app.tabs.schedule')
		}
	}
})();
