(function () {
    'use strict';

    angular
            .module('conference.events')
            .controller('EventsController', EventsController);

    EventsController.$inject = ['$state', 'eventsService', '$scope', '$filter'];

    /* @ngInject */
    function EventsController($state, eventsService, $scope, $filter) {
        var vm = angular.extend(this, {
            workshopDetails: [],
            venue: [],
            schedule: [],
            dateChanged: dateChanged,
            loadScheduleVenue: loadScheduleVenue,
            venueChanged: venueChanged,
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
        function commonLoadWorkshops(dte) { 
            
            var dt = new Date(dte.substring(6, 10) + "-" + dte.substring(3, 5) + "-" + dte.substring(0, 2) + "T18:30:00.966Z");
                dt.setDate(dt.getDate() - 1);
            angular.forEach(vm.workshopDetails, function (val, key) {
                var count = 0;
                console.log((new Date(val.startDate)).toString() + " , " + new Date(dt).toString());

                if ((new Date(val.startDate)).toString() === (new Date(dt)).toString()) {
                    $scope.noRecord = '';
                    vm.schedule.push(val);
                    console.log(angular.toJson(val.venue));
                    if(vm.venue[0]){
                        angular.forEach(vm.venue, function(vval, vkey){
                            console.log(angular.toJson(vval));
                            if(vval === val.venue){
                                //
                            }else{
                                console.log(angular.toJson(val.venue));
                                if(count === vkey){
                                    vm.venue.push(val.venue);
                                }else{
                                    count = count+1;                                
                                }
                            }
                        });
                    }else{
                        vm.venue.push(val.venue);
                    }
                    
                    
                }

//                if (vm.date[0]) {
//                    var count = 0;
//                    angular.forEach(vm.date, function (vd, vk) {
//                        console.log((new Date(val.eventDate)).toString() + " , " + (new Date(vd)).toString());
//                        if ((new Date(val.eventDate)).toString() === (new Date(vd)).toString()) {
//                            //alert('yes');
//                        } else {
//
//                            if (count === vm.date.length - 1) {
//                                vm.date.push(val.eventDate);
//                            }
//                            count = count + 1;
//                        }
//                    });
//                } else {
//                    vm.date.push(val.eventDate);
//                }
//                console.log(angular.toJson(vm.date));



            });
        }

        function getWorkshopDetails() {
            vm.schedule = [];
            vm.venue = [];
            vm.venues = 'all';
            eventsService.getWorkshops().then(function (response) {
                vm.workshopDetails = response;
                if (!vm.workshopDate) {
                    //vm.scheduleDate = new Date(items[0].eventDate); 
                    vm.workshopDate = $filter('date')(response[0].startDate, "dd-MM-yyyy");
                }
                console.log(vm.workshopDate);
                commonLoadWorkshops(vm.workshopDate);
            });

        }
        function loadScheduleVenue() {
            var dt = new Date(vm.workshopDate.substring(6, 10) + "-" + vm.workshopDate.substring(3, 5) + "-" + vm.workshopDate.substring(0, 2) + "T18:30:00.966Z");
                dt.setDate(dt.getDate() - 1);
            vm.schedule = [];
            angular.forEach(vm.workshopDetails, function (val, key) {
                if ((new Date(val.startDate)).toString() === (dt).toString()) {
                    $scope.noRecord = '';
                    
                    if (val.venue === vm.venues || vm.venues === 'all') {
                        $scope.noRecord = '';
                        vm.schedule.push(val);
                    }
                }
                

            });

        }
function dateChanged() {
            vm.schedule = [];
            vm.venue = [];
            vm.venues = 'all';
            commonLoadWorkshops(vm.workshopDate);
        }
function venueChanged() { console.log('venue changed');
            vm.schedule = [];
            loadScheduleVenue();
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
