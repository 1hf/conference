(function () {
    'use strict';

    angular
            .module('conference.events')
            .controller('EventsController', EventsController);

    EventsController.$inject = ['$state', 'eventsService', '$scope', '$filter', 'localStorageService'];

    /* @ngInject */
    function EventsController($state, eventsService, $scope, $filter, localStorageService) {
        var vm = angular.extend(this, {
            workshopDetails: [],
            AllFavoriteWorkshops: [],
            venue: [],
            schedule: [],
            all: '',
            favorites: '',
            dateChanged: dateChanged,
            loadScheduleVenue: loadScheduleVenue,
            venueChanged: venueChanged,
            goEventsDetails: goEventsDetails,
            addFavorites: addFavorites,
            removeFavorites: removeFavorites,
            getAllWorkshops: getAllWorkshops,
            getFavoriteWorkshops: getFavoriteWorkshops
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
                    if (vm.venue[0]) {
                        angular.forEach(vm.venue, function (vval, vkey) {
                            console.log(angular.toJson(vval));
                            if (vval === val.venue) {
                                //
                            } else {
                                console.log(angular.toJson(val.venue));
                                if (count === vkey) {
                                    vm.venue.push(val.venue);
                                } else {
                                    count = count + 1;
                                }
                            }
                        });
                    } else {
                        vm.venue.push(val.venue);
                    }
                }
            });
        }

        function getWorkshopDetails() {
            vm.schedule = [];
            vm.venue = [];
            vm.venues = 'all';
            eventsService.getWorkshops().then(function (response) {
                vm.workshopDetails = response;
                if (!vm.workshopDate) {
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

        function getAllWorkshops() {
            vm.schedule = [];
            vm.venue = [];
            vm.venues = 'all';
            vm.favorites = false;
            vm.all = true;
            commonLoadWorkshops(vm.workshopDate);
        }

        function getFavoriteWorkshops() {
            vm.all = false;
            vm.favorites = true;
            var dt = new Date(vm.workshopDate.substring(6, 10) + "-" + vm.workshopDate.substring(3, 5) + "-" + vm.workshopDate.substring(0, 2) + "T18:30:00.966Z");
            dt.setDate(dt.getDate() - 1);
            vm.schedule = [];
            angular.forEach(localStorageService.get('favoritesEvents'), function (val, key) {
                if (val.isInFavorites && val.isInFavorites == true) {
                    if ((new Date(val.startDate)).toString() === (dt).toString()) {
                        vm.schedule.push(val);
                    }
                }
            });
        }

        function dateChanged() {
            vm.schedule = [];
            vm.venue = [];
            vm.venues = 'all';
            vm.all = false;
            vm.favorites = false;
            commonLoadWorkshops(vm.workshopDate);
        }

        function venueChanged() {
            vm.schedule = [];
            vm.all = false;
            vm.favorites = false;
            loadScheduleVenue();
        }

        function addFavorites(event, eventId) {
            event.stopPropagation();
            eventsService.toggleFavorites(eventId, true);
        }

        function removeFavorites(eventId) {
            eventsService.toggleFavorites(eventId, false);
        }

        function goEventsDetails(id) {
            $state.go('app.event-details', {id: id});
        }
    }
})();
