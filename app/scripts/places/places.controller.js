(function() {
	'use strict';

	angular
		.module('conference.places')
		.controller('PlacesController', PlacesController);

	PlacesController.$inject = ['$ionicActionSheet', '$scope', 'placesService', 'externalAppsService', '$ionicModal'];

	/* @ngInject */
	function PlacesController($ionicActionSheet, $scope, placesService, externalAppsService, $ionicModal) {

		var vm = angular.extend(this, {
			info: null,
			vanue: null
		});

		//*********************************************

		(function activate() {
			//getConferenceData();
		})();
                
                $ionicModal.fromTemplateUrl('templates/modal.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.modal = modal;
                });
                $scope.openModal = function () {
                    $scope.modal.show()
                    
                };
//                $scope.user = {"email":"binumontsamuel@gmail.com",
//                    "firstName":"Binumon",
//                    "id":"2",
//                    "lastName":"Samuel",
//                    "mobile":9035767836,
//                    "password":"password",
//                    "userName":"binumontsamuel@gmail.com"};
//placesService.getConferenceData().then(function(res){
//    console.log(angular.toJson(res));
//});
//placesService.setUser($scope.user).then(function(res){
//    alert(angular.toJson(res));
//});


	}
})();