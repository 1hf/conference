(function() {
	'use strict';

	angular
		.module('conference.about')
		.controller('AboutController', AboutController);

	AboutController.$inject = ['$ionicActionSheet', 'aboutService', 'externalAppsService'];

	/* @ngInject */
	function AboutController($ionicActionSheet, aboutService, externalAppsService) {

		var vm = angular.extend(this, {
			info: null,
			vanue: null,
			showPopover: showPopover,
			getDirections: getDirections
		});

		//*********************************************

		(function activate() {
			getConferenceData();
		})();


		function showPopover() {
			$ionicActionSheet.show({
				buttons: [
//					{ text: 'Learn Ionic' },
//					{ text: 'Documentation' },
//					{ text: 'Showcase' },
//					{ text: 'GitHub Repo' }
				],
				cancelText: 'Cancel',
				cancel: function() {
					// add cancel code..
				},
				buttonClicked: function(index) {
					return true;
				}
			});
		}

		function getConferenceData() {
			aboutService.getConferenceData().then(function(data) {
				vm.info = data.info;
				vm.venue = data.venue;
			})
		}

		function getDirections() {
			var mapData = vm.venue.mapData;
			var officeLocation = mapData.latitude + ',' + mapData.longitude + ',' + mapData.zoomlevel;
			externalAppsService.openMapsApp(officeLocation);
		}

	}
})();