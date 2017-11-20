(function () {
    'use strict';

    angular
            .module('conference.events')
            .controller('EventsController', EventsController);

    EventsController.$inject = ['$state', 'eventsService', '$scope', '$ionicSlideBoxDelegate', '$interval'];

    /* @ngInject */
    function EventsController($state, eventsService, $scope, $ionicSlideBoxDelegate, $interval) {
        var vm = angular.extend(this, {
            workshopDetails: [],
            goEventsDetails: goEventsDetails


//			events: [],
//			filter: null,
//			favorites: false,
//			goToEventDetails: goToEventDetails,
//			showFavorites: showFavorites,
//			showAll: showAll,
//			filterChanged: filterChanged,
//			addFavorites: addFavorites,
//			removeFavorites: removeFavorites
        });

        (function activate() {
            getWorkshopDetails();
            // fetchEvents();
        })();
$scope.banners = ["http://isacon2017kolkata.com/images/logo/logo.png","images/logo.png"];
$scope.lengthG = $scope.banners.length;
                    $scope.count = 1;
                    $interval(function () {
                        if ((parseInt($scope.count)) === (parseInt($scope.lengthG))) {
                            $scope.count = 1;
                            $ionicSlideBoxDelegate.slide(0);
                        } else {
                            $ionicSlideBoxDelegate.next();
                            $scope.count++;
                        }

                        //$scope.$apply();
                    }, 5000);



        function getWorkshopDetails() {
            eventsService.getWorkshops().then(function (response) {
                vm.workshopDetails = response;
                console.log(angular.toJson(vm.workshopDetails));
            })
//vm.workshopDetails = [{
//      "title": "Comprehensive Trauma Life Support",
//      "startDate": "2017-11-23T18:30:00.000Z",
//      "endDate": "2017-11-24T18:30:00.000Z",
//      "venue": "Biswa Bangla Convention Center, Kolkata",
//      "lat": 22.5822241,
//      "lng": 88.4722141,
//      "center": true,
//      "zoomlevel": 5
//    },{
//      "title": "Emergency Neurological Life Support",
//      "startDate": "2017-11-24T18:30:00.000Z",
//      "endDate": "",
//      "venue": "Biswa Bangla Convention Center, Kolkata",
//      "lat": 22.5822241,
//      "lng": 88.4722141,
//      "center": true,
//      "zoomlevel": 5
//    },{
//      "title": "Hemodynamic Monitoring with Simulation",
//      "startDate": "2017-11-24T18:30:00.000Z",
//      "endDate": "",
//      "venue": "Fortis Hospital, Kolkata",
//      "lat": 22.5204958,
//      "lng": 88.3985927,
//      "center": true,
//      "zoomlevel": 5
//    },{
//      "title": "TEE with Simulation",
//      "startDate": "2017-11-24T18:30:00.000Z",
//      "endDate": "",
//      "venue": "RTIICS Hospital, Kolkata",
//      "lat": 22.491352,
//      "lng": 88.4002225,
//      "center": true,
//      "zoomlevel": 5
//    },{
//      "title": "Research Methodolgy",
//      "startDate": "2017-11-24T18:30:00.000Z",
//      "endDate": "",
//      "venue": "Biswa Bangla Convention Center, Kolkata",
//      "lat": 22.5822241,
//      "lng": 88.4722141,
//      "center": true,
//      "zoomlevel": 5
//    },{
//      "title": "Airway Management",
//      "startDate": "2017-11-24T18:30:00.000Z",
//      "endDate": "",
//      "venue": "Biswa Bangla Convention Center, Kolkata",
//      "lat": 22.5822241,
//      "lng": 88.4722141,
//      "center": true,
//      "zoomlevel": 5
//    },{
//      "title": "Anaesthesia Workstation & Low Flow Anaesthesia",
//      "startDate": "2017-11-24T18:30:00.000Z",
//      "endDate": "",
//      "venue": "Biswa Bangla Convention Center, Kolkata",
//      "lat": 22.5822241,
//      "lng": 88.4722141,
//      "center": true,
//      "zoomlevel": 5
//    },{
//      "title": "Thoracic Anaesthesia",
//      "startDate": "2017-11-24T18:30:00.000Z",
//      "endDate": "",
//      "venue": "Biswa Bangla Convention Center, Kolkata",
//      "lat": 22.5822241,
//      "lng": 88.4722141,
//      "center": true,
//      "zoomlevel": 5
//    },{
//      "title": "Mechanical Ventilation",
//      "startDate": "2017-11-24T18:30:00.000Z",
//      "endDate": "",
//      "venue": "Medica Superspeciality Hospital, Kolkata",
//      "lat": 22.4942862,
//      "lng": 88.398709,
//      "center": true,
//      "zoomlevel": 5
//    },{
//      "title": "USG Guided Regional Anaesthesia",
//      "startDate": "2017-11-24T18:30:00.000Z",
//      "endDate": "",
//      "venue": "Tata Medical Center, Kolkata",
//      "lat": 22.5773524,
//      "lng": 88.4780462,
//      "center": true,
//      "zoomlevel": 5
//    },{
//      "title": "Imaging in Anaesthesia & Critical Care",
//      "startDate": "2017-11-24T18:30:00.000Z",
//      "endDate": "",
//      "venue": "Biswa Bangla Convention Center, Kolkata",
//      "lat": 22.5822241,
//      "lng": 88.4722141,
//      "center": true,
//      "zoomlevel": 5
//    },{
//      "title": "Fluoroscopy & USG Guided Interventional Pain Management",
//      "startDate": "2017-11-24T18:30:00.000Z",
//      "endDate": "",
//      "venue": "ESI Institute of Pain Management, Kolkata",
//      "lat": 22.5726169,
//      "lng": 88.3720124,
//      "center": true,
//      "zoomlevel": 5
//    }];
        }

        function goEventsDetails(id) {
            $state.go('app.event-details', {id: id});}

//		$scope.$on('$ionicView.enter', function() {
//			fetchEvents();
//		});
//
//		function fetchEvents() {
//			eventsService.fetchEvents(vm.filter, vm.favorites).then(function(items) {
//				vm.events = items;
//			})
//		}
//
//		function goToEventDetails(id) {
//			$state.go('app.event-details', {
//				id: id
//			});
//		}
//
//		function filterChanged() {
//			fetchEvents();
//		}
//
//		function addFavorites(event, eventId) {
//			event.stopPropagation();
//			eventsService.toggleFavorites(eventId, true);
//			$ionicListDelegate.closeOptionButtons();
//		}
//
//		function removeFavorites(eventId) {
//			eventsService.toggleFavorites(eventId, false);
//			showFavorites();
//		}
//
//		function showFavorites() {
//			vm.favorites = true;
//			fetchEvents();
//		}
//
//		function showAll() {
//			vm.favorites = false;
//			fetchEvents();
//		}
    }
})();
